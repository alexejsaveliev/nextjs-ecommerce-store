import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';
import { OrderInfo } from '@/email/components/OrderInfo';
import { Fragment } from 'react';

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    product: {
      id: string;
      name: string;
      description: string;
      imagePath: string;
    };
    downloadVerificationId: string;
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      product: {
        id: crypto.randomUUID(),
        name: 'Product Name',
        description: 'Product description',
        imagePath: 'products/973c4d2a-232b-4493-ad4e-b404307893c7-2many.jpeg',
      },
      id: crypto.randomUUID(),
      pricePaidInCents: 10000,
      createdAt: new Date(),
      downloadVerificationId: crypto.randomUUID(),
    },
    {
      product: {
        id: crypto.randomUUID(),
        name: 'Product Name 2',
        description: 'Product description 2',
        imagePath: 'products/973c4d2a-232b-4493-ad4e-b404307893c7-2many.jpeg',
      },
      id: crypto.randomUUID(),
      pricePaidInCents: 10000,
      createdAt: new Date(),
      downloadVerificationId: crypto.randomUUID(),
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head></Head>
        <Body className="bg-white font-sans">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <Fragment key={order.id}>
                <OrderInfo
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
