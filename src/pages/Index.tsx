import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
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
  SheetTrigger,
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
    badge: 'ХИТ',
    rating: 4.7,
    reviews: 189,
    inStock: true
  },
  {
    id: 4,
    title: 'Умные часы FitTrack',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Носимые устройства',
    rating: 4.6,
    reviews: 142,
    inStock: false
  },
  {
    id: 5,
    title: 'Беспроводные наушники Sport',
    price: 7990,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
    category: 'Аудио',
    rating: 4.5,
    reviews: 289,
    inStock: true
  },
  {
    id: 6,
    title: 'Планшет MediaPad Ultra',
    price: 32990,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop',
    category: 'Планшеты',
    badge: 'НОВИНКА',
    rating: 4.8,
    reviews: 156,
    inStock: true
  },
  {
    id: 7,
    title: 'Игровая клавиатура RGB',
    price: 15990,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    category: 'Аксессуары',
    rating: 4.7,
    reviews: 312,
    inStock: true
  },
  {
    id: 8,
    title: 'Веб-камера 4K Pro',
    price: 9990,
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=500&h=500&fit=crop',
    category: 'Аксессуары',
    rating: 4.4,
    reviews: 98,
    inStock: true
  }
];

const categories = [
  { name: 'Все', icon: 'Grid3x3' },
  { name: 'Смартфоны', icon: 'Smartphone' },
  { name: 'Ноутбуки', icon: 'Laptop' },
  { name: 'Планшеты', icon: 'Tablet' },
  { name: 'Аудио', icon: 'Headphones' },
  { name: 'Носимые устройства', icon: 'Watch' },
  { name: 'Аксессуары', icon: 'Cable' }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [showInStock, setShowInStock] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  let filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory === 'Все' || p.category === selectedCategory;
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    const ratingMatch = p.rating >= minRating;
    const stockMatch = !showInStock || p.inStock;
    
    return categoryMatch && priceMatch && ratingMatch && stockMatch;
  });

  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

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
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Icon name="Tag" size={18} />
          Категории
        </h3>
        <nav className="flex flex-col gap-1">
          {categories.map(cat => (
            <Button
              key={cat.name}
              variant={selectedCategory === cat.name ? "default" : "ghost"}
              className="justify-start"
              onClick={() => {
                setSelectedCategory(cat.name);
                setIsMobileMenuOpen(false);
              }}
            >
              <Icon name={cat.icon as any} size={18} className="mr-2" />
              {cat.name}
            </Button>
          ))}
        </nav>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Icon name="DollarSign" size={18} />
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
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Icon name="Star" size={18} />
          Рейтинг
        </h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map(rating => (
            <Button
              key={rating}
              variant={minRating === rating ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setMinRating(minRating === rating ? 0 : rating)}
            >
              <div className="flex items-center gap-2">
                <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                <span>{rating}+</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={showInStock}
          onCheckedChange={(checked) => setShowInStock(checked as boolean)}
        />
        <label
          htmlFor="inStock"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Только в наличии
        </label>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSelectedCategory('Все');
          setPriceRange([0, 100000]);
          setMinRating(0);
          setShowInStock(false);
        }}
      >
        <Icon name="RotateCcw" size={18} className="mr-2" />
        Сбросить фильтры
      </Button>
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

      <div className="relative h-[400px] bg-gradient-to-br from-primary/20 via-background to-primary/10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.2),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(239,68,68,0.15),transparent_50%)]"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
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
            <Card className="p-6 sticky top-24 border-l-4 border-l-primary">
              <FilterContent />
            </Card>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-3xl font-bold">
                {selectedCategory === 'Все' ? 'Популярные товары' : selectedCategory}
                <span className="text-base font-normal text-muted-foreground ml-2">
                  ({filteredProducts.length})
                </span>
              </h2>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Icon name="Filter" size={20} className="mr-2" />
                      Фильтры
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Фильтры</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Популярные</SelectItem>
                    <SelectItem value="price-asc">Дешевле</SelectItem>
                    <SelectItem value="price-desc">Дороже</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="PackageX" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground mb-4">Попробуйте изменить параметры фильтрации</p>
                <Button onClick={() => {
                  setSelectedCategory('Все');
                  setPriceRange([0, 100000]);
                  setMinRating(0);
                  setShowInStock(false);
                }}>
                  Сбросить фильтры
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden group hover:shadow-xl hover:shadow-primary/10 transition-all hover:border-primary/50">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.badge && (
                        <Badge className="absolute top-3 right-3 shadow-lg">
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
                        className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <Icon name="Heart" size={18} />
                      </Button>
                    </div>
                    
                    <div className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                      <h3 className="font-semibold mb-2 line-clamp-2 min-h-[3rem]">{product.title}</h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-primary">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </div>
                        <Button 
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          size="sm"
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Icon name="ShoppingCart" size={24} />
              Корзина
              {totalItems > 0 && (
                <Badge variant="secondary">{totalItems}</Badge>
              )}
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 flex flex-col mt-6">
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
                            <p className="text-lg font-bold text-primary mb-2">
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
                                className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
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
                    <span className="text-2xl font-bold text-primary">
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
