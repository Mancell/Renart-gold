import { useMemo } from 'react';
import { ProductList } from '@/components/ProductList';
import { useGoldPrice } from '@/hooks/useGoldPrice';
import productsData from '@/data/products.json';
import { TrendingUp, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { goldPrice, loading } = useGoldPrice();

  const productsWithPrices = useMemo(() => {
    return productsData.map(product => ({
      ...product,
      price: (product.popularityScore + 1) * product.weight * goldPrice,
      popularityRating: ((product.popularityScore * 5) * 10) / 10
    }));
  }, [goldPrice]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="w-7 h-7 text-gold" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  Altın Koleksiyonu
                </h1>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20">
              <TrendingUp className="w-4 h-4 text-gold" />
              <span className="font-semibold text-gold">${goldPrice.toFixed(2)}/g</span>
            </Badge>
          </div>
        </div>
      </nav>

      {/* Products Section */}
      <main className="relative py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nişan Yüzüğü Koleksiyonu
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Her biri özenle tasarlanmış altın yüzükler
            </p>
          </div>
          
          <ProductList products={productsWithPrices} loading={loading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Crown className="w-6 h-6 text-gold" />
              <div>
                <h3 className="text-base font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  Altın Koleksiyonu
                </h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Altın Koleksiyonu. Tüm hakları saklıdır.
            </p>
            <Badge variant="outline" className="border-gold/30 text-gold">
              ${goldPrice.toFixed(2)}/g
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
