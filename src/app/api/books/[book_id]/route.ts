import { NextRequest, NextResponse } from 'next/server';

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   console.log('id');
//   return NextResponse.json({ success: true, message: 'id is:' + params.id });
// }

export async function GET(
  request: Request,
  { params }: { params: { book_id: string } }
) {
  const slug = params.book_id; // 'a', 'b', or 'c'
  console.log('calling indivigual book');
  return NextResponse.json({
    success: true,
  });
}
