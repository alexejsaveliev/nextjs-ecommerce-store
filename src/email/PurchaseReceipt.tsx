import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';
import { OrderInfo } from '@/email/components/OrderInfo';

type PurchaseReceiptProps = {
  product: {
    name: string;
    description: string;
    imagePath: string;
  };
  order: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
  };
  downloadVerificationId: string;
};

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: 'Product Name',
    description: 'Product description',
    imagePath: 'products/973c4d2a-232b-4493-ad4e-b404307893c7-2many.jpeg',
  },
  order: {
    id: crypto.randomUUID(),
    pricePaidInCents: 10000,
    createdAt: new Date(),
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head></Head>
        <Body className="bg-white font-sans">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInfo
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
