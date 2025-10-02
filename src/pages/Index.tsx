import { useMemo } from 'react';
import { ProductList } from '@/components/ProductList';
import { useGoldPrice } from '@/hooks/useGoldPrice';
import productsData from '@/data/products.json';
import { Sparkles, TrendingUp, Shield, Award } from 'lucide-react';
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

  const features = [
    {
      icon: Shield,
      title: "Güvenli Alışveriş",
      description: "Sertifikalı ve garantili"
    },
    {
      icon: Award,
      title: "Kaliteli Ürünler",
      description: "Premium altın kalitesi"
    },
    {
      icon: TrendingUp,
      title: "Güncel Fiyatlar",
      description: "Anlık altın fiyatları"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-rose-gold/5 pointer-events-none" />
        
        <nav className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-gold" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                  Altın Koleksiyonu
                </h1>
              </div>
              <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                ${goldPrice.toFixed(2)}/g
              </Badge>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <Badge variant="outline" className="border-gold/30 text-gold mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Özel Koleksiyon
            </Badge>
            
            <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Zarafet ve Lüksün
              <span className="block bg-gradient-to-r from-gold via-gold-light to-rose-gold bg-clip-text text-transparent mt-2">
                Mükemmel Uyumu
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              El işçiliği ile hazırlanmış, zarif tasarımlı altın yüzükler. Sarı, pembe ve beyaz altın seçenekleriyle özel anlarınız için.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="p-3 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Products Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nişan Yüzüğü Koleksiyonu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Her biri özenle tasarlanmış, benzersiz altın yüzüklerimizi keşfedin
          </p>
        </div>
        
        <ProductList products={productsWithPrices} loading={loading} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-gold" />
                <h3 className="font-bold text-foreground">Altın Koleksiyonu</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Lüks ve zarif altın ürünleriyle özel anlarınızı değerli kılın.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">İletişim</h4>
              <p className="text-sm text-muted-foreground">
                Sorularınız için bizimle iletişime geçin
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Bilgi</h4>
              <p className="text-sm text-muted-foreground">
                Güncel altın fiyatları ile hesaplanan değerler
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2024 Altın Koleksiyonu. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
