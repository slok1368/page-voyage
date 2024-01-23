import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../_db';

async function authenticate(email: string, clientPassword: string) {
  try {
    // Retrieve user data from the database using the provided email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, username: true, password: true },
    });

    // Check if a user with the provided email exists
    if (!user || !user.password) {
      return null; // User not found
    }

    // Compare the provided password (hashed) with the stored hashed password
    const passwordMatch = await bcrypt.compare(clientPassword, user.password);

    if (passwordMatch) {
      // Passwords match, return the user's ID
      return {
        id: user.id,
        email: email,
        name: user.username,
      };
    } else {
      // Passwords do not match
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

async function googleAuthenticate(email: string, googleId: string) {
  try {
    // Search DB if googleId exists
    const user = await prisma.user.findFirst({
      where: { googleId },
      select: { id: true },
    });

    if (!user) {
      // Create new account if no results found
      const userId = uuidv4();
      await prisma.user.create({
        data: {
          id: userId,
          email,
          googleId,
        },
      });
      return userId;
    } else {
      return user.id;
    }
  } catch (error) {
    console.error(error);
    throw error; // Handle the error appropriately in your application
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (typeof credentials !== 'undefined') {
          const res = await authenticate(
            credentials.email,
            credentials.password
          );
          // Check database with the email
          if (res) {
            // console.log(res);
            return res;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    session: ({ session, token }) => {
      // console.log('Session Callback', { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: async ({ token, user, account }) => {
      // console.log('JWT Callback', { token, user, account });
      if (user) {
        const u = user as unknown as any;
        let userId = u.id;

        if (account && account.provider === 'google') {
          userId = await googleAuthenticate(user.email as string, user.id);
        }
        return {
          ...token,
          id: userId,
        };
      }

      return token;
    },
  },
};
