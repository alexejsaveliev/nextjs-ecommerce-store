import { PageHeader } from '@/app/admin/_components/PageHeader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import db from '@/db/db';
import { MoreVertical } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteDropdownItem } from '@/app/admin/orders/_components/OrderActions';

export default function AdminUsersPage() {
  return (
    <>
      <PageHeader>Orders</PageHeader>
      <UsersTable />
    </>
  );
}

function getOrders() {
  return db.order.findMany({
    select: {
      id: true,
      product: { select: { name: true } },
      user: { select: { email: true } },
      pricePaidInCents: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

async function UsersTable() {
  const orders = await getOrders();

  if (orders.length === 0) return <p>No orders found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{order.user.email}</TableCell>
            <TableCell>
              {formatCurrency(order.pricePaidInCents / 100)}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropdownItem id={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
