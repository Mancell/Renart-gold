import { useState, useMemo, useCallback } from 'react';
import { ProductCard } from './ProductCard';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SlidersHorizontal, RotateCcw, DollarSign, Star } from 'lucide-react';
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

  const handlePriceChange = useCallback((value: number[] | [number, number]) => {
    setPriceRange(value as [number, number]);
  }, []);

  const handlePopularityChange = useCallback((value: number[] | [number, number]) => {
    setPopularityRange(value as [number, number]);
  }, []);

  const handleResetFilters = useCallback(() => {
    setPriceRange([0, maxPrice]);
    setPopularityRange([0, 5]);
  }, [maxPrice]);

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gold" />
            <h2 className="text-2xl font-bold text-foreground">Filtreler</h2>
          </div>
          <Button variant="outline" size="sm" onClick={handleResetFilters} className="border-gold/30 hover:bg-gold/10">
            <RotateCcw className="w-4 h-4 mr-2" />
            Sıfırla
          </Button>
        </div>

        <Separator className="bg-border/50" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-background/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gold" />
                <Label className="text-base">Fiyat Aralığı</Label>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-gold/30">${priceRange[0].toFixed(0)}</Badge>
                <span className="text-muted-foreground">-</span>
                <Badge variant="outline" className="border-gold/30">${priceRange[1].toFixed(0)}</Badge>
              </div>
            </div>
            <Slider
              min={0}
              max={maxPrice}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
              aria-label="Fiyat aralığı"
            />
          </div>

          <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-background/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gold" />
                <Label className="text-base">Popülerlik</Label>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-gold/30">{popularityRange[0].toFixed(1)} ★</Badge>
                <span className="text-muted-foreground">-</span>
                <Badge variant="outline" className="border-gold/30">{popularityRange[1].toFixed(1)} ★</Badge>
              </div>
            </div>
            <Slider
              min={0}
              max={5}
              step={0.1}
              value={popularityRange}
              onValueChange={handlePopularityChange}
              className="w-full"
              aria-label="Popülerlik aralığı"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filteredProducts.length} ürün bulundu</span>
        </div>
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
