import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Heart, Download, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import { getProductById, getProducts, type Product } from '@/services/productsApi';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const res = await getProductById(id);
        if (!mounted) return;
        setProduct(res);
        const imgs = Array.isArray((res as any).images) && (res as any).images.length > 0 ? (res as any).images : [res.image];
        setActiveImage(imgs[0] || res.image);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setProduct(null);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!product) return;
    let mounted = true;
    (async () => {
      try {
        const res = await getProducts({
          page: 1,
          limit: 4,
          category: [product.category],
          excludeId: product.id,
        });
        if (!mounted) return;
        setRelated(res.products);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setRelated([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-poppins">
        <Navigation />
        <div className="py-20 text-center text-gray-600">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white font-poppins">
        <Navigation />
        <div className="py-20 text-center text-gray-600">Product not found</div>
        <Footer />
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: activeImage || product.image }, quantity);
  };

  const handleBulkOrder = () => {
    window.open('mailto:info@kattainteriors.com?subject=Bulk Order Inquiry: ' + product.name, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <img src={activeImage || product.image} alt={product.name} className="w-full h-96 object-cover rounded-2xl shadow-lg" />
            <div className="flex space-x-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  onClick={() => setActiveImage(img)}
                  className={cn(
                    'w-20 h-20 object-cover rounded-xl cursor-pointer border-2',
                    (activeImage || product.image) === img ? 'border-primary' : 'border-gray-200'
                  )}
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-primary font-bold text-4xl mb-6">₹{product.price}</p>
            <p className="text-gray-600 mb-6 font-poppins">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="font-semibold">{key}:</span> {value}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <label className="text-sm font-medium">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex space-x-4 mb-6">
              <Button onClick={handleAddToCart} className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-4">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" onClick={handleBulkOrder} className="rounded-full text-lg py-4">
                Order Bulk
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleWishlist(product.id)}
              className="rounded-full border-2 border-gray-200 hover:border-primary/50"
            >
              <Heart className={cn('h-6 w-6', isInWishlist(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-400')} />
            </Button>

            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold mb-2">Shipping & Delivery</h3>
              <p className="text-sm text-gray-600">Free shipping on orders over ₹5000. Estimated delivery: 3-7 days.</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specs">Technical Specs</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="related">Related Products</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <p className="text-gray-700 font-poppins leading-relaxed">{product.description} Ideal for architects and homeowners seeking premium materials for kitchens, furniture, and more.</p>
            </TabsContent>
            <TabsContent value="specs" className="mt-6">
              <ul className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key} className="flex justify-between text-sm">
                    <span className="font-medium">{key}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="mt-4 flex items-center">
                Download Brochure <Download className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <p className="text-gray-600">No reviews yet. Be the first to review this product.</p>
            </TabsContent>
            <TabsContent value="related" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {related.map((related) => (
                  <ProductCard
                    key={related.id}
                    product={related}
                    isInWishlist={isInWishlist(related.id)}
                    onWishlistToggle={toggleWishlist}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;