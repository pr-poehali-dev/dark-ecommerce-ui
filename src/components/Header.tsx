import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Icon name="Zap" size={24} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">TechStore</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Акции</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Доставка</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block w-80">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Icon name="Search" size={20} />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Icon name="Heart" size={20} />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Icon name="User" size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
            <Icon name="ShoppingCart" size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs flex items-center justify-center text-primary-foreground font-medium">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
