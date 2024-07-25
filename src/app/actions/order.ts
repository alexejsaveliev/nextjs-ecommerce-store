'use server';

import db from '@/db/db';
import { z } from 'zod';
import { Resend } from 'resend';
import OrderHistoryEmail from '@/email/OrderHistory';

const orderHistorySchema = z.object({
  email: z.string().email(),
});

const resend = new Resend(process.env.RESEND_API_KEY as string);

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

export async function emailOrderHistory(
  prevState: unknown,
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const result = orderHistorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!result.success) {
    return {
      error: 'Invalid email address',
    };
  }

  const user = await db.user.findUnique({
    where: { email: result.data.email },
    select: {
      email: true,
      orders: {
        select: {
          id: true,
          pricePaidInCents: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              imagePath: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return {
      message: 'No orders found for this email',
    };
  }

  const orders = user.orders.map(async (order) => ({
    ...order,
    downloadVerificationId: (
      await db.downloadVerification.create({
        data: {
          productId: order.product.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      })
    ).id,
  }));

  const data = await resend.emails.send({
    from: `Support <${process.env.RESEND_SENDER_EMAIL}>`,
    to: [user.email],
    subject: 'Order History',
    react: OrderHistoryEmail({
      orders: await Promise.all(orders),
    }),
  });

  if (data.error) {
    return {
      error: 'There was an error sending the email. Please try again.',
    };
  }

  return {
    message:
      'Check your email for your order history and download your products.',
  };
}
