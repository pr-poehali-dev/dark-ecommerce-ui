import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Беспроводные наушники Premium',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/9d601de0-f00f-4adb-9cbe-899ad5a49120.jpg',
    category: 'Аудио',
    badge: 'ХИТ',
    rating: 4.8,
    reviews: 234
  },
  {
    id: 2,
    title: 'Смартфон UltraMax Pro',
    price: 54990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/39dcfad6-9b13-4ea3-9573-eb1d16035a94.jpg',
    category: 'Смартфоны',
    badge: 'НОВИНКА',
    rating: 4.9,
    reviews: 567
  },
  {
    id: 3,
    title: 'Умные часы FitTrack',
    price: 8990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/4a5d01ec-89e7-4056-b724-682b0ace5eae.jpg',
    category: 'Носимые устройства',
    rating: 4.7,
    reviews: 189
  },
  {
    id: 4,
    title: 'Игровая мышь RGB Pro',
    price: 5990,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    category: 'Аксессуары',
    rating: 4.6,
    reviews: 142
  },
  {
    id: 5,
    title: 'Механическая клавиатура',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    category: 'Аксессуары',
    badge: 'ХИТ',
    rating: 4.8,
    reviews: 289
  },
  {
    id: 6,
    title: 'Портативная колонка Bass',
    price: 7990,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    category: 'Аудио',
    rating: 4.5,
    reviews: 156
  }
];

const categories = ['Все', 'Смартфоны', 'Аудио', 'Носимые устройства', 'Аксессуары'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-foreground">TechStore</h1>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Категории</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-2 mt-6">
                    {categories.map(cat => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "ghost"}
                        className="justify-start"
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Поиск товаров..." 
                  className="pl-10 bg-card"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Icon name="Heart" size={24} />
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
                <Icon name="ShoppingCart" size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={24} />
              </Button>
            </div>
          </div>

          <div className="mt-4 md:hidden">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Поиск товаров..." 
                className="pl-10 bg-card"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="relative h-[400px] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.8)_100%)]"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h2 className="text-5xl font-bold mb-4">Новейшая электроника</h2>
          <p className="text-xl text-muted-foreground mb-8">Гаджеты и аксессуары для вашего образа жизни</p>
          <Button size="lg" className="font-semibold">
            Смотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-card rounded-lg p-6 sticky top-24 border border-border">
              <h2 className="text-lg font-semibold mb-4">Категории</h2>
              <nav className="flex flex-col gap-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-3xl font-bold">
                {selectedCategory === 'Все' ? 'Популярные товары' : selectedCategory}
              </h2>
              <p className="text-muted-foreground mt-2">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : 'товаров'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div 
                  key={product.id}
                  className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                    >
                      <Icon name="Heart" size={20} />
                    </Button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {product.category}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Icon name="Star" size={16} className="fill-yellow-500 text-yellow-500" />
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews} отзывов)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Button 
                        onClick={() => addToCart(product)}
                        size="sm"
                        className="hover:scale-105 transition-transform"
                      >
                        <Icon name="ShoppingCart" size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Корзина</SheetTitle>
          </SheetHeader>
          
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Корзина пуста</p>
              <Button className="mt-4" onClick={() => setIsCartOpen(false)}>
                Перейти к покупкам
              </Button>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 bg-card p-4 rounded-lg border border-border">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.price.toLocaleString('ru-RU')} ₽
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Icon name="Trash2" size={18} />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 mt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Итого:</span>
                  <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <Button className="w-full" size="lg">
                  Оформить заказ
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
