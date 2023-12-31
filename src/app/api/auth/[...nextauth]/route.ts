import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pool } from '../../_db';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import { v4 as uuidv4 } from 'uuid';

async function authenticate(email: string, clientPassword: string) {
  try {
    // Retrieve user data from the database using the provided email
    const result = await pool.query(
      'SELECT username, user_id, password FROM users WHERE email = $1',
      [email]
    );

    // Check if a user with the provided email exists
    if (result.rows.length === 0) {
      return null; // User not found
    }

    // Retrieve the hashed password from the database
    const { username, user_id, password } = result.rows[0];

    // Compare the provided password (hashed) with the stored hashed password
    const passwordMatch = await bcrypt.compare(clientPassword, password);

    if (passwordMatch) {
      // Passwords match, return the user's ID
      return {
        id: user_id,
        email: email,
        name: username,
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
    const result = await pool.query(
      'SELECT user_id FROM users WHERE google_id = $1',
      [googleId]
    );

    if (result.rows.length === 0) {
      // Create new account if no results found
      const userId = uuidv4();
      await pool.query(
        'INSERT INTO users (user_id, email, google_id) VALUES ($1, $2, $3)',
        [userId, email, googleId]
      );
      return userId;
    } else {
      return result.rows[0].user_id;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
