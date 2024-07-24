'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTransition } from 'react';
import {
  deleteProduct,
  toggleProductAvailability,
} from '@/app/admin/products/new/_actions/products';

export function ActiveToggleDropdownItem({
  id,
  isAvailable,
}: {
  id: string;
  isAvailable: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailable);
        });
      }}
    >
      {isAvailable ? 'Deactivate' : 'Activate'}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      variant="destructive"
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
