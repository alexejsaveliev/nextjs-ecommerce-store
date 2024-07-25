'use server';

import db from '@/db/db';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function deleteOrder(id: string) {
  const order = await db.order.delete({ where: { id } });

  if (order == null) return notFound();

  revalidatePath('/');
  revalidatePath('/orders');

  return order;
}
