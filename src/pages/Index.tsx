import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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
    reviews: 234
  },
  {
    id: 2,
    title: 'Смартфон UltraMax Pro',
    price: 54990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/0d29c596-d821-4020-bc2d-d74ddb82c0a4.jpg',
    category: 'Смартфоны',
    badge: 'НОВИНКА',
    rating: 4.9,
    reviews: 567
  },
  {
    id: 3,
    title: 'Игровой ноутбук Gaming Pro',
    price: 89990,
    image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/35242471-c1af-4b43-aa00-2dccf5cc3e37.jpg',
    category: 'Ноутбуки',
    badge: 'ХИТ',
    rating: 4.7,
    reviews: 189
  },
  {
    id: 4,
    title: 'Умные часы FitTrack',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Носимые устройства',
    rating: 4.6,
    reviews: 142
  },
  {
    id: 5,
    title: 'Беспроводные наушники Sport',
    price: 7990,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
    category: 'Аудио',
    rating: 4.5,
    reviews: 289
  },
  {
    id: 6,
    title: 'Планшет MediaPad Ultra',
    price: 32990,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop',
    category: 'Планшеты',
    badge: 'НОВИНКА',
    rating: 4.8,
    reviews: 156
  }
];

const categories = ['Все', 'Смартфоны', 'Ноутбуки', 'Планшеты', 'Аудио', 'Носимые устройства'];

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
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
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24">
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
            </Card>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                {selectedCategory === 'Все' ? 'Популярные товары' : selectedCategory}
              </h2>
              <div className="lg:hidden">
                <Sheet>
                  <Button variant="outline">
                    <Icon name="Filter" size={20} className="mr-2" />
                    Фильтры
                  </Button>
                </Sheet>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>
                  
                  <div className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
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
                      <Button onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>

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
