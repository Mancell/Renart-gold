import { useMemo } from 'react';
import { ProductList } from '@/components/ProductList';
import { useGoldPrice } from '@/hooks/useGoldPrice';
import productsData from '@/data/products.json';
import { Loader2 } from 'lucide-react';

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
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Altın Koleksiyonu
              </h1>
              <p className="text-sm text-muted-foreground">
                Lüks ve zarif altın ürünlerimizi keşfedin
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Güncel Altın Fiyatı</p>
              <p className="text-2xl font-bold text-primary">
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin inline" />
                ) : (
                  `$${goldPrice.toFixed(2)}/g`
                )}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <ProductList products={productsWithPrices} loading={loading} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Altın Koleksiyonu. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
