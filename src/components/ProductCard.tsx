import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-card border-border">
      <div className="relative overflow-hidden">
        {product.badge && (
          <Badge className="absolute top-3 left-3 z-10 bg-primary">{product.badge}</Badge>
        )}
        {discount > 0 && (
          <Badge className="absolute top-3 right-3 z-10 bg-destructive">-{discount}%</Badge>
        )}
        
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
            <Icon name="Heart" size={16} />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
            <Icon name="Eye" size={16} />
          </Button>
        </div>

        <div className="aspect-square bg-background/50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon
              key={i}
              name="Star"
              size={14}
              className={i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>

        <h3 className="font-semibold text-base mb-3 line-clamp-2 min-h-[48px]">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-foreground">{product.price.toLocaleString()} ₽</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.oldPrice.toLocaleString()} ₽
            </span>
          )}
        </div>

        {!product.inStock && (
          <Badge variant="secondary" className="mb-2">
            Нет в наличии
          </Badge>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          <Icon name="ShoppingCart" size={18} className="mr-2" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}
