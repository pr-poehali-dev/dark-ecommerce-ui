import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Icon name="Zap" className="text-primary" size={28} />
            <span className="text-xl font-bold">TechStore</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Каталог
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Акции
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              О нас
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center relative w-[300px]">
            <Icon name="Search" className="absolute left-3 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Icon name="Heart" size={20} />
          </Button>

          <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
            <Icon name="ShoppingCart" size={20} />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon">
            <Icon name="User" size={20} />
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
