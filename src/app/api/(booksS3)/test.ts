import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';

const s3Client = new S3Client({
  credentials: fromIni({ profile: 'default' }),
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  if (url.searchParams.get('id')) {
    return NextResponse.json({
      success: true,
      message: 'For' + url.searchParams.get('id'),
    });
  }
  const command = new GetObjectCommand({
    Bucket: 'page-voyage-dev-books',
    Key: 'test-html.html',
  });

  try {
    const response = await s3Client.send(command);
    let str = '';

    if (response.Body) {
      str = await response.Body.transformToString();
    }

    console.log(str);
    return NextResponse.json({ success: true, message: str });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
