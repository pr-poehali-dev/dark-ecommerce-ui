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
}

const products: Product[] = [
  {
    id: 1,
    title: 'Беспроводные наушники Pro',
    price: 15990,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Аудио',
    badge: 'ХИТ'
  },
  {
    id: 2,
    title: 'Умные часы Sport',
    price: 24990,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Носимая электроника',
    badge: 'НОВИНКА'
  },
  {
    id: 3,
    title: 'Портативная колонка Bass',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    category: 'Аудио'
  },
  {
    id: 4,
    title: 'Игровая мышь RGB Pro',
    price: 5990,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    category: 'Компьютерные аксессуары'
  },
  {
    id: 5,
    title: 'Механическая клавиатура',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    category: 'Компьютерные аксессуары',
    badge: 'ХИТ'
  },
  {
    id: 6,
    title: 'Веб-камера HD 4K',
    price: 9990,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop',
    category: 'Видео'
  }
];

const categories = ['Все', 'Аудио', 'Носимая электроника', 'Компьютерные аксессуары', 'Видео'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

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
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Heart" size={24} />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingCart" size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
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

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-card rounded-lg p-6 sticky top-24">
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
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 right-3 bg-primary">
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
                    <p className="text-sm text-muted-foreground mb-3">
                      {product.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Button 
                        onClick={addToCart}
                        className="hover:scale-105 transition-transform"
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
