import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import db from '@/db/db';
import { Resend } from 'resend';
import PurchaseReceiptEmail from '@/email/PurchaseReceipt';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET_KEY as string
  );

  if (event.type === 'charge.succeeded') {
    const charge = event.data.object;
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    const pricePaidInCents = charge.amount;

    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (product == null || email == null) {
      return new NextResponse('Bad request', { status: 400 });
    }

    const orderFields = { create: { productId, pricePaidInCents } };
    const {
      orders: [order],
    } = await db.user.upsert({
      create: {
        email,
        orders: orderFields,
      },
      update: {
        orders: orderFields,
      },
      where: { email },
      select: {
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    const downloadVerification = await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    const { error } = await resend.emails.send({
      from: `Info <${process.env.RESEND_SENDER_EMAIL}>`,
      to: [email],
      subject: 'Order Confirmation',
      react: PurchaseReceiptEmail({
        product,
        order,
        downloadVerificationId: downloadVerification.id,
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }

  return new NextResponse();
}
