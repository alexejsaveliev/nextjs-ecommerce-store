'use client';

import { Product } from '@prisma/client';
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { formatCurrency } from '@/lib/formatters';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormEvent, useState } from 'react';
import { userOrderExists } from '@/app/actions/order';

type CheckoutFormProps = {
  product: Product;
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function CheckoutForm({ clientSecret, product }: CheckoutFormProps) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="flex items-center gap-4">
        <div className="relative flex aspect-video w-1/3 flex-shrink-0">
          <Image
            fill
            src={product.imagePath}
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form priceInCents={product.priceInCents} productId={product.id} />
      </Elements>
    </div>
  );
}

function Form({
  priceInCents,
  productId,
}: {
  priceInCents: number;
  productId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  const isButtonDisabled = !stripe || !elements || isLoading;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !email) return;

    setIsLoading(true);

    const orderExists = await userOrderExists(email, productId);

    if (orderExists) {
      setErrorMessage('You have already purchased this product');
      setIsLoading(false);
      return;
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occurred');
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <PaymentElement />
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
          />
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full" disabled={isButtonDisabled}>
            {isLoading ? 'Processing...' : 'Purchase'} -{' '}
            {formatCurrency(priceInCents / 100)}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
