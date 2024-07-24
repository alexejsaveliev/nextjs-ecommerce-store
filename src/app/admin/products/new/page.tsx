import { PageHeader } from '@/app/admin/_components/PageHeader';
import { ProductForm } from '@/app/admin/products/new/_components/ProductForm';

export default function NewProductPage() {
  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm />
    </>
  );
}
