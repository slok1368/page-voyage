import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { CreateUserRequestBody } from '@/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password }: CreateUserRequestBody =
      await req.json();

    // Check if a user with the provided email exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    // If a user with the provided email exists, return an error.
    if (user) {
      return NextResponse.json(
        { error: `User with email ${email} already exists` },
        { status: 409 }
      );
    }

    // Generate a UUID for the new user.
    const userId = uuidv4();

    // Hash the password using bcrypt.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database using Prisma.
    await prisma.user.create({
      data: {
        id: userId,
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    // Return a successful response.
    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error when creating user' },
      { status: 500 }
    );
  }
}
