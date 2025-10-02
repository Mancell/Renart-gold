import { useMemo } from 'react';
import { ProductList } from '@/components/ProductList';
import { useGoldPrice } from '@/hooks/useGoldPrice';
import productsData from '@/data/products.json';
import { Sparkles, TrendingUp, Shield, Award, ChevronDown, Gem, Crown, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { goldPrice, loading } = useGoldPrice();

  const productsWithPrices = useMemo(() => {
    return productsData.map(product => ({
      ...product,
      price: (product.popularityScore + 1) * product.weight * goldPrice,
      popularityRating: ((product.popularityScore * 5) * 10) / 10
    }));
  }, [goldPrice]);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Shield,
      title: "Güvenli Alışveriş",
      description: "Sertifikalı ve garantili ürünler",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: Award,
      title: "Kaliteli Ürünler",
      description: "Premium altın kalitesi",
      color: "from-gold/20 to-gold-light/20"
    },
    {
      icon: TrendingUp,
      title: "Güncel Fiyatlar",
      description: "Anlık altın fiyatları",
      color: "from-green-500/20 to-green-600/20"
    },
    {
      icon: Gem,
      title: "El Yapımı",
      description: "Özel tasarım koleksiyonlar",
      color: "from-purple-500/20 to-purple-600/20"
    }
  ];

  const stats = [
    { value: "10K+", label: "Mutlu Müşteri" },
    { value: "500+", label: "Ürün Çeşidi" },
    { value: "15+", label: "Yıllık Tecrübe" },
    { value: "99%", label: "Memnuniyet" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Crown className="w-8 h-8 text-gold animate-pulse" />
                <Sparkles className="w-3 h-3 text-gold-light absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gold via-gold-light to-rose-gold bg-clip-text text-transparent">
                  Altın Koleksiyonu
                </h1>
                <p className="text-xs text-muted-foreground">Lüks Mücevher</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex items-center gap-2 px-4 py-2">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold">${goldPrice.toFixed(2)}/g</span>
            </Badge>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-background to-rose-gold/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--gold)/0.1),transparent_50%)]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/10 to-rose-gold/10 border border-gold/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-gold to-rose-gold bg-clip-text text-transparent">
                2024 Özel Koleksiyonu
              </span>
              <Heart className="w-4 h-4 text-rose-gold animate-pulse" />
            </div>
            
            {/* Main Heading */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] tracking-tight">
              Zarafet ve
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-gold via-gold-light to-rose-gold bg-clip-text text-transparent">
                  Lüksün
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-rose-gold/20 blur-2xl -z-10" />
              </span>
              {" "}Dünyası
            </h2>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              El işçiliği ile hazırlanmış, zarif tasarımlı altın yüzükler.
              <br className="hidden md:block" />
              Her biri bir sanat eseri.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={scrollToProducts}
                className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-dark hover:to-gold text-white shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/40 transition-all duration-300 hover:scale-105 px-8 py-6 text-lg"
              >
                <Gem className="w-5 h-5 mr-2" />
                Koleksiyonu Keşfet
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gold/30 hover:border-gold hover:bg-gold/5 px-8 py-6 text-lg"
              >
                <Heart className="w-5 h-5 mr-2" />
                Favorilere Ekle
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-12 animate-bounce">
              <ChevronDown className="w-8 h-8 text-gold mx-auto" />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-20 border-y border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2 group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="border-gold/30 text-gold">
              <Award className="w-3 h-3 mr-1" />
              Neden Biz?
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Size Özel Avantajlar
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Her detayda mükemmellik için çalışıyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/10"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative space-y-4">
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-gold/10 to-transparent group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <main id="products" className="py-24 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-6">
            <Badge variant="outline" className="border-gold/30 text-gold">
              <Gem className="w-3 h-3 mr-1" />
              Premium Koleksiyon
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Nişan Yüzüğü Koleksiyonu
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Her biri özenle tasarlanmış, benzersiz altın yüzüklerimizi keşfedin.
              <br />
              Sarı, pembe ve beyaz altın seçenekleriyle.
            </p>
          </div>
          
          <ProductList products={productsWithPrices} loading={loading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/50 bg-gradient-to-b from-card/50 to-card">
        <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-gold" />
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                    Altın Koleksiyonu
                  </h3>
                  <p className="text-xs text-muted-foreground">Lüks Mücevher</p>
                </div>
              </div>
              <p className="text-muted-foreground max-w-md">
                Lüks ve zarif altın ürünleriyle özel anlarınızı değerli kılın. 
                Her detayda mükemmellik için çalışıyoruz.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Güvenli
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Award className="w-3 h-3 mr-1" />
                  Sertifikalı
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Gem className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                Hizmetler
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-gold transition-colors cursor-pointer">Nişan Yüzükleri</li>
                <li className="hover:text-gold transition-colors cursor-pointer">Düğün Yüzükleri</li>
                <li className="hover:text-gold transition-colors cursor-pointer">Özel Tasarım</li>
                <li className="hover:text-gold transition-colors cursor-pointer">Tamir & Bakım</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gold" />
                Bilgi
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-gold transition-colors cursor-pointer">Güncel Fiyatlar</li>
                <li className="hover:text-gold transition-colors cursor-pointer">Hakkımızda</li>
                <li className="hover:text-gold transition-colors cursor-pointer">İletişim</li>
                <li className="hover:text-gold transition-colors cursor-pointer">SSS</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Altın Koleksiyonu. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Güncel Altın:</span>
              <Badge variant="outline" className="border-gold/30 text-gold">
                ${goldPrice.toFixed(2)}/g
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
