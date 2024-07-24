import db from '@/db/db';
import { Product } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { Suspense } from 'react';
import { cache } from '@/lib/cache';

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getMostPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: 'desc' } },
      take: 6,
    });
  },
  ['/', 'getMostPopularProducts'],
  { revalidate: 60 * 60 * 24 }
);

const getNewestProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
  },
  ['/', 'getNewestProducts'],
  { revalidate: 60 * 60 * 24 }
);

export default function HomePage() {
  return (
    <div className="space-y-12">
      <ProductGridSection
        productFetcher={getMostPopularProducts}
        title="Most Popular"
      />
      <ProductGridSection productFetcher={getNewestProducts} title="Newest" />
    </div>
  );
}

type ProductGridSectionProps = {
  title: string;
  productFetcher: () => Promise<Product[]>;
};

function ProductGridSection({
  productFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productFetcher={productFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productFetcher,
}: {
  productFetcher: () => Promise<Product[]>;
}) {
  const products = await productFetcher();
  return products.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      priceInCents={product.priceInCents}
      description={product.description}
      imagePath={product.imagePath}
    />
  ));
}
