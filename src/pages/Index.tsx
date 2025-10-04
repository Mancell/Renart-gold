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
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-2xl shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gold to-rose-gold opacity-20 blur-xl group-hover:opacity-30 transition-opacity rounded-full" />
                <Crown className="w-9 h-9 text-gold relative animate-pulse" />
                <Sparkles className="w-3.5 h-3.5 text-gold-light absolute -top-1 -right-1 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gold via-gold-light to-rose-gold bg-clip-text text-transparent tracking-tight">
                  Altın Koleksiyonu
                </h1>
                <p className="text-xs text-muted-foreground font-medium tracking-wide">Lüks Mücevher Atölyesi</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-gold/10 to-gold-light/10 border border-gold/20 hover:border-gold/30 transition-all">
              <TrendingUp className="w-4 h-4 text-gold" />
              <span className="font-bold text-gold">${goldPrice.toFixed(2)}/g</span>
            </Badge>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-background via-50% to-rose-gold/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--gold)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--rose-gold)/0.1),transparent_50%)]" />
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-rose-gold/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-gold-light/5 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center space-y-10 animate-fade-in">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gold/10 via-gold-light/10 to-rose-gold/10 border border-gold/30 backdrop-blur-md shadow-lg shadow-gold/10 hover:shadow-gold/20 transition-all">
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-gold via-gold-light to-rose-gold bg-clip-text text-transparent">
                2024 Özel Koleksiyonu
              </span>
              <Heart className="w-4 h-4 text-rose-gold animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            
            {/* Enhanced Main Heading */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[1.05] tracking-tighter">
              <span className="text-foreground">Zarafet ve</span>
              <br />
              <span className="relative inline-block mt-4">
                <span className="bg-gradient-to-r from-gold via-gold-light to-rose-gold bg-clip-text text-transparent animate-gradient">
                  Lüksün
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-gold/30 via-gold-light/30 to-rose-gold/30 blur-3xl -z-10 animate-pulse" />
              </span>
              <br />
              <span className="text-foreground mt-2 inline-block">Dünyası</span>
            </h2>
            
            {/* Enhanced Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              El işçiliği ile hazırlanmış, zarif tasarımlı altın yüzükler.
              <br className="hidden md:block" />
              <span className="text-foreground/80 font-normal">Her biri bir sanat eseri.</span>
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
              <Button
                size="lg"
                onClick={scrollToProducts}
                className="relative group bg-gradient-to-r from-gold via-gold-light to-gold text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 px-10 py-7 text-lg font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-dark to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Gem className="w-5 h-5 mr-2 relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Koleksiyonu Keşfet</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gold/40 hover:border-gold hover:bg-gradient-to-r hover:from-gold/10 hover:to-rose-gold/10 px-10 py-7 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
              >
                <Heart className="w-5 h-5 mr-2 hover:text-rose-gold transition-colors" />
                Favorilere Ekle
              </Button>
            </div>

            {/* Enhanced Scroll Indicator */}
            <div className="pt-16 animate-bounce">
              <div className="inline-flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Keşfet</span>
                <ChevronDown className="w-8 h-8 text-gold" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Stats Section */}
      <section className="relative py-24 border-y border-border/40 bg-gradient-to-b from-card/50 to-muted/20 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--gold)/0.05),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3 group cursor-default">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold-light opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-gold via-gold-light to-rose-gold bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-5">
            <Badge variant="outline" className="border-gold/40 text-gold px-4 py-2 text-sm font-semibold">
              <Award className="w-4 h-4 mr-2" />
              Neden Biz?
            </Badge>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Size Özel Avantajlar
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light">
              Her detayda mükemmellik için çalışıyoruz, sizin için en iyisini sunuyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-10 rounded-3xl bg-card border border-border/40 hover:border-gold/40 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-gold/20"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="relative space-y-5">
                  <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-gold/15 via-gold-light/10 to-transparent group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-lg shadow-gold/10">
                    <feature.icon className="w-9 h-9 text-gold" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{feature.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Products Section */}
      <main id="products" className="relative py-32 bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--gold)/0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--rose-gold)/0.05),transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-6">
            <Badge variant="outline" className="border-gold/40 text-gold px-4 py-2 text-sm font-semibold shadow-lg shadow-gold/10">
              <Gem className="w-4 h-4 mr-2" />
              Premium Koleksiyon
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Nişan Yüzüğü Koleksiyonu
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Her biri özenle tasarlanmış, benzersiz altın yüzüklerimizi keşfedin.
              <br />
              <span className="text-foreground/80 font-normal">Sarı, pembe ve beyaz altın seçenekleriyle.</span>
            </p>
          </div>
          
          <ProductList products={productsWithPrices} loading={loading} />
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative border-t border-border/40 bg-gradient-to-b from-card/50 via-muted/10 to-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gold/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl" />
        
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
