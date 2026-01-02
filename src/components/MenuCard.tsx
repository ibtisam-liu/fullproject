import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuItem } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuCard = ({ item, onAddToCart }: MenuCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onAddToCart(item)} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuCard;
