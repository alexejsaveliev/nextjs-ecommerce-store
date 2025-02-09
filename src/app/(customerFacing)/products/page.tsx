import { Suspense } from 'react';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import db from '@/db/db';
import { cache } from '@/lib/cache';

const getProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { name: 'asc' },
    });
  },
  ['/products', 'getProducts'],
  { revalidate: 60 * 60 * 24 }
);

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductSuspense />
      </Suspense>
    </div>
  );
}

async function ProductSuspense() {
  const products = await getProducts();
  return products.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      description={product.description}
      priceInCents={product.priceInCents}
      imagePath={product.imagePath}
    />
  ));
}
