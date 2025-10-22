import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar, { Filters } from '@/components/Sidebar';
import ProductCard, { Product } from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CartItem extends Product {
  quantity: number;
}

export default function Index() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 100000],
    brands: [],
  });

  const products: Product[] = [
    {
      id: 1,
      name: 'Беспроводные наушники Premium Sound Pro',
      price: 12990,
      oldPrice: 16990,
      image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/bd6a8446-61f0-4470-adab-f70510546147.jpg',
      rating: 4.8,
      reviews: 124,
      inStock: true,
      badge: 'ХИТ',
    },
    {
      id: 2,
      name: 'Смартфон Galaxy Ultra 2024',
      price: 89990,
      oldPrice: 99990,
      image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/70b0e3ae-559d-4425-b5c4-9eed045fdb16.jpg',
      rating: 4.9,
      reviews: 342,
      inStock: true,
      badge: 'НОВИНКА',
    },
    {
      id: 3,
      name: 'Умные часы SmartWatch Series 8',
      price: 24990,
      image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/505dd9a7-e9b9-4eee-a810-5d5ebb8bffdc.jpg',
      rating: 4.7,
      reviews: 89,
      inStock: true,
    },
    {
      id: 4,
      name: 'Наушники AirPods Max',
      price: 59990,
      image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/bd6a8446-61f0-4470-adab-f70510546147.jpg',
      rating: 4.9,
      reviews: 256,
      inStock: false,
    },
    {
      id: 5,
      name: 'Смартфон iPhone 15 Pro Max',
      price: 129990,
      oldPrice: 139990,
      image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/70b0e3ae-559d-4425-b5c4-9eed045fdb16.jpg',
      rating: 5.0,
      reviews: 512,
      inStock: true,
      badge: 'ТОП',
    },
    {
      id: 6,
      name: 'Умные часы Apple Watch Ultra',
      price: 79990,
      image: 'https://cdn.poehali.dev/projects/1506aa6c-1df7-4f63-9760-8bcf59a42578/files/505dd9a7-e9b9-4eee-a810-5d5ebb8bffdc.jpg',
      rating: 4.8,
      reviews: 178,
      inStock: true,
    },
  ];

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="flex">
        <Sidebar onFilterChange={setFilters} />
        
        <main className="flex-1">
          <section className="relative h-[400px] overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border">
            <div className="container h-full flex items-center px-6">
              <div className="max-w-2xl">
                <h1 className="text-5xl font-bold mb-4">
                  Новейшие технологии
                  <br />
                  <span className="text-primary">по лучшим ценам</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Огромный выбор смартфонов, ноутбуков, наушников и других гаджетов
                </p>
                <Button size="lg" className="gap-2">
                  Смотреть каталог
                  <Icon name="ArrowRight" size={20} />
                </Button>
              </div>
            </div>
          </section>

          <section className="container px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Популярные товары</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="SlidersHorizontal" size={16} className="mr-2" />
                  Фильтры
                </Button>
                <Button variant="outline" size="sm">
                  Сортировка
                  <Icon name="ChevronDown" size={16} className="ml-2" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
