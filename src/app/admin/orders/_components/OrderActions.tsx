'use client';

import { useTransition } from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { deleteOrder } from '@/app/admin/_actions/order';

export function DeleteDropdownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={isPending}
      variant="destructive"
      className={cn({
        'cursor-pointer': !isPending,
        'cursor-not-allowed': isPending,
      })}
      onClick={() => {
        startTransition(async () => {
          await deleteOrder(id);
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
