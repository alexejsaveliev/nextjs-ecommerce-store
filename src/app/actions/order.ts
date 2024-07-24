'use server';

import db from '@/db/db';

export async function userOrderExists(email: string, productId: string) {
  return db.order
    .findFirst({
      where: {
        productId,
      },
      select: {
        id: true,
      },
    })
    .then((order) => order !== null);
}
