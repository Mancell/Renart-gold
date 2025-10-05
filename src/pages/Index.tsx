import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductList } from '@/components/ProductList';
import { SearchBar } from '@/components/ui/search-bar';
import { useGoldPrice } from '@/hooks/useGoldPrice';
import { TrendingUp, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { goldPrice, loading } = useGoldPrice();

  interface ApiProduct {
    name: string;
    popularityScore: number;
    weight: number;
    images: {
      yellow: string;
      rose: string;
      white: string;
    };
    price: number;
  }

  const { data, isLoading: isLoadingProducts, isError } = useQuery<{ products: ApiProduct[] }>({
    queryKey: ['products'],
    queryFn: async () => {
    const endpoint = 'https://renart-backend-api-production.up.railway.app/api/products';
    const res = await fetch(endpoint, { mode: 'cors' });      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
    staleTime: 60_000,
  });

  const [query, setQuery] = useState('');

  const productsForUi = useMemo(() => {
    const items = data?.products ?? [];
    const normalize = (v: string) => v.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const q = normalize(query);
    return items
      .map((p, index) => ({
        id: String(index + 1),
        name: p.name,
        popularityScore: p.popularityScore,
        weight: p.weight,
        images: p.images,
        price: p.price,
        popularityRating: Math.round(p.popularityScore * 5 * 10) / 10,
      }))
      .filter(p => normalize(p.name).includes(q));
  }, [data, query]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 left-0 right-0 z-50 border-b border-border/40 bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/renart-logo.jpeg" alt="Renart" className="w-12 h-12 rounded" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-black">
                  Renart
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-gold/30 bg-white shadow-sm">
              <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-gold" />
              </div>
              <div className="leading-tight">
                <span className="block text-[10px] uppercase tracking-wide text-muted-foreground">Altın/g</span>
                <span className="block text-sm font-semibold text-foreground">${goldPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          
        </div>
      </nav>

      {/* Products Section */}
      <main className="relative py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold mx-auto">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wide uppercase">Yeni Koleksiyon</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Zarafetin Yeni Tanımı
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-gold to-gold-light rounded-full mx-auto" />
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Renart'ın seçkin altın yüzük koleksiyonunu keşfedin. Her parçada ince işçilik ve modern çizgiler.
            </p>
            <div className="flex justify-center">
              <SearchBar
                placeholder="Ürün ara..."
                onSearch={setQuery}
                suggestions={productsForUi.slice(0, 12).map(p => p.name)}
              />
            </div>
            {isError && (
              <p className="text-sm text-red-500">Ürünler yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
            )}
          </div>
          
          <ProductList products={productsForUi} loading={loading || isLoadingProducts} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/renart-logo.jpeg" alt="Renart" className="w-8 h-8 rounded" />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-black">
                  Renart
                </h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Renart. Tüm hakları saklıdır.
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
