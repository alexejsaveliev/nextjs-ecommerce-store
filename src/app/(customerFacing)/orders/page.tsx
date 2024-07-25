'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { emailOrderHistory } from '@/app/actions/order';

export default function MyOrdersPage() {
  const [result, action] = useFormState(emailOrderHistory, {});
  return (
    <form action={action} className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Enter your email and we will email you your order history and
            download links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-500" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md border border-gray-300 p-2"
              id="email"
              name="email"
              type="email"
            />
            {result.error && <p className="text-destructive">{result.error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          {result.message ? <p>{result.message}</p> : <SubmitButton />}
        </CardFooter>
      </Card>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? 'Sending...' : 'Get My Orders'}
    </Button>
  );
}
