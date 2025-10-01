import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Product {
  id: string;
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
  price: number;
  popularityRating: number;
}

interface ProductListProps {
  products: Product[];
  loading?: boolean;
}

export const ProductList = ({ products, loading }: ProductListProps) => {
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price), 0), [products]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [popularityRange, setPopularityRange] = useState<[number, number]>([0, 5]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1] &&
      product.popularityRating >= popularityRange[0] &&
      product.popularityRating <= popularityRange[1]
    );
  }, [products, priceRange, popularityRange]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[500px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-card p-6 rounded-xl shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Filtreler</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label className="text-base">
              Fiyat Aralığı: ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
            </Label>
            <Slider
              min={0}
              max={maxPrice}
              step={10}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base">
              Popülerlik: {popularityRange[0].toFixed(1)} - {popularityRange[1].toFixed(1)} ★
            </Label>
            <Slider
              min={0}
              max={5}
              step={0.1}
              value={popularityRange}
              onValueChange={(value) => setPopularityRange(value as [number, number])}
              className="w-full"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} ürün bulundu
        </p>
      </div>

      {/* Carousel for mobile/tablet */}
      <div className="lg:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {filteredProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Grid for desktop */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Seçilen filtrelere uygun ürün bulunamadı.
          </p>
        </div>
      )}
    </div>
  );
};
