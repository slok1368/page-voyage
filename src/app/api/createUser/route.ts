import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { CreateUserRequestBody } from '@/types';
import { pool } from '@/app/api/_db';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password }: CreateUserRequestBody =
      await req.json();
    console.log(req.body);

    // Generate a UUID for the new user.
    const user_id = uuidv4();

    // Hash the password using bcrypt.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database.
    await pool.query(
      'INSERT INTO users (user_id, username, email, password, books) VALUES ($1, $2, $3, $4, $5)',
      [user_id, username, email, hashedPassword, []]
    );

    // Return a successful response.
    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
