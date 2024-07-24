import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';
import fs from 'fs/promises';

export async function GET(
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) {
  const { product } =
    (await db.downloadVerification.findUnique({
      where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
      select: {
        product: { select: { filePath: true, name: true } },
      },
    })) || {};

  if (!product) {
    return NextResponse.redirect(
      new URL('/products/download/expired', req.url)
    );
  }

  const { size } = await fs.stat(product.filePath);
  const file = await fs.readFile(product.filePath);
  const extension = product.filePath.split('.').pop();

  return new NextResponse(file, {
    headers: {
      'Content-Type': `application/${extension}`,
      'Content-Length': size.toString(),
      'Content-Disposition': `attachment; filename="${product.name}.${extension}"`,
    },
  });
}
