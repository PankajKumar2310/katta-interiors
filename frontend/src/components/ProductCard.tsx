import { Link } from 'react-router-dom';
import type { Product } from '@/services/productsApi';
import { Button } from './ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onWishlistToggle: (id: string) => void;
}

const ProductCard = ({ product, isInWishlist, onWishlistToggle }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle(product.id);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
      </Link>
      <Button
        size="icon"
        variant="ghost"
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full h-9 w-9 z-10"
      >
        <Heart className={cn('h-5 w-5 transition-all', isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-500')} />
      </Button>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.subcategory}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-primary">₹{product.price}</span>
          <Button onClick={handleAddToCart} size="sm" variant="outline" className="rounded-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;