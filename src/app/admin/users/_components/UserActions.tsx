'use client';

import { useTransition } from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { deleteUser } from '@/app/admin/_actions/users';

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
          await deleteUser(id);
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
