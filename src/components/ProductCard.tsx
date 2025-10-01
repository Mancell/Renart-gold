import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
  yellow: 'bg-primary hover:bg-primary/80',
  rose: 'bg-rose-gold hover:bg-rose-gold/80',
  white: 'bg-white-gold hover:bg-white-gold/80'
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorType>('yellow');

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
          {product.popularityRating.toFixed(1)} ★
        </Badge>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.weight}g</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">USD</span>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Renk Seçimi</p>
          <div className="flex gap-2">
            {(Object.keys(product.images) as ColorType[]).map((color) => (
              <Button
                key={color}
                size="sm"
                variant={selectedColor === color ? 'default' : 'outline'}
                className={`flex-1 transition-all ${
                  selectedColor === color 
                    ? colorClasses[color] 
                    : 'hover:bg-secondary'
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
