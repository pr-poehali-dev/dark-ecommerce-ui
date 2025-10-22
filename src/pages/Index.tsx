import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from '@/components/ui/icon';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  rating: number;
  reviews: number;
  brand: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Беспроводные наушники Premium',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/b7c5a1c6-0561-4a1e-87c6-ab7a39a18588.jpg',
    category: 'Аудио',
    brand: 'Sony',
    badge: 'ХИТ',
    rating: 4.8,
    reviews: 234,
    inStock: true
  },
  {
    id: 2,
    title: 'Смартфон UltraMax Pro',
    price: 54990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/0d29c596-d821-4020-bc2d-d74ddb82c0a4.jpg',
    category: 'Смартфоны',
    brand: 'Samsung',
    badge: 'НОВИНКА',
    rating: 4.9,
    reviews: 567,
    inStock: true
  },
  {
    id: 3,
    title: 'Игровой ноутбук Gaming Pro',
    price: 89990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/35242471-c1af-4b43-aa00-2dccf5cc3e37.jpg',
    category: 'Ноутбуки',
    brand: 'Apple',
    badge: 'ХИТ',
    rating: 4.7,
    reviews: 189,
    inStock: true
  },
  {
    id: 4,
    title: 'Умные часы FitTrack Pro',
    price: 8990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/e30373dc-8d6b-48a5-8920-251db271bcbb.jpg',
    category: 'Носимые устройства',
    brand: 'Xiaomi',
    rating: 4.6,
    reviews: 142,
    inStock: true
  },
  {
    id: 5,
    title: 'TWS наушники AirPods Style',
    price: 7990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/a4704971-b87b-46a8-9464-1f0ad289dd27.jpg',
    category: 'Аудио',
    brand: 'Apple',
    badge: 'ХИТ',
    rating: 4.5,
    reviews: 289,
    inStock: true
  },
  {
    id: 6,
    title: 'Планшет MediaPad Ultra',
    price: 32990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/75f9ad18-b64d-440c-aae2-eb3e08a4541f.jpg',
    category: 'Планшеты',
    brand: 'Huawei',
    badge: 'НОВИНКА',
    rating: 4.8,
    reviews: 156,
    inStock: true
  },
  {
    id: 7,
    title: 'Механическая клавиатура RGB Pro',
    price: 9990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/bf1172fb-1a49-4fb0-b1dd-03e0e8fedac7.jpg',
    category: 'Аксессуары',
    brand: 'Xiaomi',
    rating: 4.7,
    reviews: 345,
    inStock: true
  },
  {
    id: 8,
    title: 'Игровая мышь RGB Ultra',
    price: 5990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/cf054c2f-586b-4769-b158-e87325eebe96.jpg',
    category: 'Аксессуары',
    brand: 'Xiaomi',
    rating: 4.6,
    reviews: 278,
    inStock: true
  },
  {
    id: 9,
    title: 'Портативная колонка Bass Pro',
    price: 6990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/2d95bbc6-8e5d-4d1d-a7c6-b67aa77ec1ea.jpg',
    category: 'Аудио',
    brand: 'Sony',
    rating: 4.5,
    reviews: 198,
    inStock: true
  },
  {
    id: 10,
    title: 'Power Bank 20000mAh',
    price: 3990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/1abe8fe3-c292-45b5-b202-416ce60699d0.jpg',
    category: 'Аксессуары',
    brand: 'Xiaomi',
    rating: 4.7,
    reviews: 512,
    inStock: true
  },
  {
    id: 11,
    title: 'Веб-камера 4K Pro',
    price: 11990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/1f0e3cc1-b7c6-4afc-a39e-0107dd199fef.jpg',
    category: 'Аксессуары',
    brand: 'Sony',
    rating: 4.6,
    reviews: 234,
    inStock: true
  },
  {
    id: 12,
    title: 'USB микрофон Studio',
    price: 8990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/45dc2737-af25-4e0c-860a-70efa159eefb.jpg',
    category: 'Аудио',
    brand: 'Sony',
    badge: 'НОВИНКА',
    rating: 4.8,
    reviews: 456,
    inStock: true
  },
  {
    id: 13,
    title: 'Умная колонка Smart Home',
    price: 5990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/ba2c139c-091b-4162-9991-5c179d458477.jpg',
    category: 'Аудио',
    brand: 'Xiaomi',
    rating: 4.5,
    reviews: 189,
    inStock: true
  },
  {
    id: 14,
    title: 'Квадрокоптер с камерой 4K',
    price: 35990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/4908056c-d46c-4f44-a6da-d855b6b7b580.jpg',
    category: 'Гаджеты',
    brand: 'Xiaomi',
    badge: 'НОВИНКА',
    rating: 4.7,
    reviews: 312,
    inStock: true
  },
  {
    id: 15,
    title: 'VR шлем MetaVerse Pro',
    price: 45990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/ae9e8adc-6485-4328-952c-a095acd9944c.jpg',
    category: 'Носимые устройства',
    brand: 'Sony',
    badge: 'ХИТ',
    rating: 4.8,
    reviews: 456,
    inStock: true
  },
  {
    id: 16,
    title: 'Смартфон iPhone 15 Pro',
    price: 99990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/0d29c596-d821-4020-bc2d-d74ddb82c0a4.jpg',
    category: 'Смартфоны',
    brand: 'Apple',
    rating: 4.9,
    reviews: 789,
    inStock: true
  },
  {
    id: 17,
    title: 'Ноутбук MacBook Pro M3',
    price: 149990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/35242471-c1af-4b43-aa00-2dccf5cc3e37.jpg',
    category: 'Ноутбуки',
    brand: 'Apple',
    badge: 'НОВИНКА',
    rating: 4.9,
    reviews: 456,
    inStock: true
  },
  {
    id: 18,
    title: 'Планшет iPad Pro 12.9',
    price: 79990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/75f9ad18-b64d-440c-aae2-eb3e08a4541f.jpg',
    category: 'Планшеты',
    brand: 'Apple',
    badge: 'НОВИНКА',
    rating: 4.9,
    reviews: 834,
    inStock: true
  }
];

const categories = [
  { name: 'Все', icon: 'Grid3x3', color: 'text-gray-400' },
  { name: 'Смартфоны', icon: 'Smartphone', color: 'text-blue-400' },
  { name: 'Ноутбуки', icon: 'Laptop', color: 'text-purple-400' },
  { name: 'Планшеты', icon: 'Tablet', color: 'text-green-400' },
  { name: 'Аудио', icon: 'Headphones', color: 'text-orange-400' },
  { name: 'Носимые устройства', icon: 'Watch', color: 'text-pink-400' },
  { name: 'Аксессуары', icon: 'Cable', color: 'text-cyan-400' },
  { name: 'Гаджеты', icon: 'Gamepad2', color: 'text-yellow-400' }
];

const brands = ['Apple', 'Samsung', 'Sony', 'Xiaomi', 'Huawei'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showInStock, setShowInStock] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 100000]);
    setMinRating(0);
    setShowInStock(false);
    setSelectedBrands([]);
  };

  const filteredProducts = products
    .filter(p => selectedCategory === 'Все' || p.category === selectedCategory)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(p => p.rating >= minRating)
    .filter(p => selectedBrands.length === 0 || selectedBrands.includes(p.brand))
    .filter(p => !showInStock || p.inStock)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Фильтры</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <Icon name="RotateCcw" size={16} className="mr-1" />
          Сбросить
        </Button>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Icon name="LayoutGrid" size={18} className="text-primary" />
          Категории
        </h3>
        <nav className="grid grid-cols-1 gap-2">
          {categories.map(cat => (
            <Button
              key={cat.name}
              variant={selectedCategory === cat.name ? "default" : "outline"}
              className="justify-start h-auto py-3"
              onClick={() => {
                setSelectedCategory(cat.name);
                setIsMobileMenuOpen(false);
              }}
            >
              <Icon name={cat.icon as any} size={20} className={`mr-3 ${selectedCategory === cat.name ? '' : cat.color}`} />
              <span className="flex-1 text-left">{cat.name}</span>
              {selectedCategory === cat.name && (
                <Icon name="Check" size={18} className="ml-2" />
              )}
            </Button>
          ))}
        </nav>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Icon name="DollarSign" size={18} className="text-primary" />
          Цена
        </h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100000}
            step={1000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
            <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Icon name="Sparkles" size={18} className="text-primary" />
          Бренды
        </h3>
        <div className="space-y-3">
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-3">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label
                htmlFor={brand}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Icon name="Star" size={18} className="text-primary" />
          Минимальный рейтинг
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[4.5, 4.0, 3.5, 3.0].map(rating => (
            <Button
              key={rating}
              variant={minRating === rating ? "default" : "outline"}
              size="sm"
              className="justify-center"
              onClick={() => setMinRating(minRating === rating ? 0 : rating)}
            >
              <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
              <span>{rating}+</span>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="inStock"
            checked={showInStock}
            onCheckedChange={(checked) => setShowInStock(checked as boolean)}
          />
          <label
            htmlFor="inStock"
            className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2"
          >
            <Icon name="PackageCheck" size={16} className="text-primary" />
            Только в наличии
          </label>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Zap" className="text-primary" size={28} />
              <h1 className="text-2xl font-bold">TechShop</h1>
            </div>

            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Поиск товаров..." 
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Icon name="Heart" size={22} />
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
                <Icon name="ShoppingCart" size={22} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={22} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative h-[400px] bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.15),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Новейшая электроника
          </h2>
          <p className="text-xl text-muted-foreground mb-8">Гаджеты и аксессуары для вашего образа жизни</p>
          <Button size="lg" className="font-semibold">
            Смотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <Card className="p-6 shadow-lg border-2">
                <FilterContent />
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} className="text-primary" />
                    <h3 className="font-semibold">Акция дня!</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Скидка до 30% на смартфоны и аксессуары
                  </p>
                  <Button variant="default" size="sm" className="w-full">
                    Смотреть акции
                  </Button>
                </div>
              </Card>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold">
                  {selectedCategory === 'Все' ? 'Популярные товары' : selectedCategory}
                </h2>
                <Badge variant="secondary" className="text-sm">
                  {filteredProducts.length} товаров
                </Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Icon name="Filter" size={18} className="mr-2" />
                  Фильтры
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Популярные</SelectItem>
                    <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                    <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 right-3">
                        {product.badge}
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                          Нет в наличии
                        </Badge>
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{product.category}</span>
                      <span className="text-xs text-muted-foreground">{product.brand}</span>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </div>
                      <Button 
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        size="sm"
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-1" />
                        {product.inStock ? 'В корзину' : 'Нет'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Фильтры</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Icon name="ShoppingCart" size={24} />
              Корзина
              {totalItems > 0 && (
                <Badge variant="secondary">{totalItems}</Badge>
              )}
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col h-full mt-6">
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Корзина пуста</p>
                <p className="text-muted-foreground">Добавьте товары для оформления заказа</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto -mx-6 px-6">
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <Card key={item.id} className="p-4">
                        <div className="flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium mb-1 line-clamp-2">{item.title}</h4>
                            <p className="text-lg font-bold mb-2">
                              {item.price.toLocaleString('ru-RU')} ₽
                            </p>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={16} />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-medium">Итого:</span>
                    <span className="text-2xl font-bold">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}