import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  onFilterChange: (filters: Filters) => void;
}

export interface Filters {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
}

export default function Sidebar({ onFilterChange }: SidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const categories = [
    { id: 'smartphones', label: 'Смартфоны', icon: 'Smartphone' },
    { id: 'laptops', label: 'Ноутбуки', icon: 'Laptop' },
    { id: 'headphones', label: 'Наушники', icon: 'Headphones' },
    { id: 'watches', label: 'Умные часы', icon: 'Watch' },
    { id: 'tablets', label: 'Планшеты', icon: 'Tablet' },
  ];

  const brands = ['Apple', 'Samsung', 'Sony', 'Xiaomi', 'Huawei'];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((c) => c !== categoryId);
    setSelectedCategories(updated);
    onFilterChange({ categories: updated, priceRange, brands: selectedBrands });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const updated = checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter((b) => b !== brand);
    setSelectedBrands(updated);
    onFilterChange({ categories: selectedCategories, priceRange, brands: updated });
  };

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    onFilterChange({ categories: selectedCategories, priceRange: range, brands: selectedBrands });
  };

  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r border-border bg-card/50 p-6 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-4">Категории</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={category.id}
                  className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  <Icon name={category.icon as any} size={16} className="text-muted-foreground" />
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold text-lg mb-4">Цена</h3>
          <div className="space-y-4">
            <Slider
              min={0}
              max={100000}
              step={1000}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{priceRange[0].toLocaleString()} ₽</span>
              <span>{priceRange[1].toLocaleString()} ₽</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold text-lg mb-4">Бренды</h3>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <label
                  htmlFor={brand}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
