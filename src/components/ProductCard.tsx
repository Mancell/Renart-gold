import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

type ColorType = 'yellow' | 'rose' | 'white';

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

interface ProductCardProps {
  product: Product;
}

const colorLabels: Record<ColorType, string> = {
  yellow: 'Sarı Altın',
  rose: 'Pembe Altın',
  white: 'Beyaz Altın'
};

const colorClasses: Record<ColorType, string> = {
  yellow: '!bg-primary hover:!bg-primary/80',
  rose: '!bg-rose-gold hover:!bg-rose-gold/80 !text-white',
  white: '!bg-white-gold hover:!bg-white-gold/80 !text-foreground'
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorType>('yellow');
  const ratingAngle = Math.round((product.popularityRating / 5) * 360);
  const ratingPercent = Math.round((product.popularityRating / 5) * 100);

  return (
    <Card className="overflow-hidden group hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 hover:-translate-y-1 border-border/50 hover:border-gold/30 bg-gradient-to-br from-card to-card/50">
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative group">
                <div
                  className="relative w-14 h-14 rounded-full p-[2px] shadow-lg transition-transform group-hover:scale-105"
                  style={{ background: `conic-gradient(#D4AF37 ${ratingAngle}deg, rgba(255,255,255,0.15) 0deg)` }}
                  aria-label={`Popülerlik ${product.popularityRating.toFixed(1)} / 5`}
                >
                  <div className="absolute inset-[2px] rounded-full bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                    <Star className="w-4 h-4 text-gold mb-0.5" />
                    <span className="text-xs font-semibold text-white leading-none">
                      {product.popularityRating.toFixed(1)}
                    </span>
                    <span className="text-[9px] text-white/70 leading-none mt-0.5">{ratingPercent}%</span>
                  </div>
                </div>
                <div className="absolute -inset-1 rounded-full bg-gold/20 blur-md opacity-0 group-hover:opacity-70 transition-opacity" aria-hidden />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white border-gold/30">
              Popülerlik: {product.popularityRating.toFixed(1)} / 5
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <div className="p-6 space-y-5">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs border-gold/30 text-muted-foreground">
              {product.weight}g
            </Badge>
          </div>
        </div>

        <div className="flex items-baseline justify-between p-4 bg-gradient-to-br from-gold/5 to-transparent rounded-lg border border-gold/10">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Fiyat</p>
            <span className="text-2xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">USD</span>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-gold to-gold-light rounded-full" />
            Renk Seçenekleri
          </p>
          <div className="flex gap-2">
            {(Object.keys(product.images) as ColorType[]).map((color) => (
              <Button
                key={color}
                size="sm"
                variant={selectedColor === color ? 'default' : 'ghost'}
                className={`flex-1 transition-all duration-300 font-medium ${
                  selectedColor === color 
                    ? `${colorClasses[color]} text-white border-0 shadow-lg scale-105` 
                    : 'hover:bg-secondary/50 border border-border/50 hover:border-gold/30 hover:scale-102'
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {colorLabels[color]}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
