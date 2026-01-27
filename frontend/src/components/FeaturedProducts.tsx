import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ShoppingCart, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { getProducts, type Product } from '@/services/productsApi';

const FeaturedProducts = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    breakpoints: { '(min-width: 768px)': { slidesToScroll: 2 }, '(min-width: 1024px)': { slidesToScroll: 3 } }
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { addToCart } = useCart();
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()));
    }
  }, [emblaApi]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getProducts({ featured: true, page: 1, limit: 8 });
        if (!mounted) return;
        setFeaturedProducts(res.products);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setFeaturedProducts([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    if (isPlaying && !autoPlayInterval) {
      const interval = setInterval(() => emblaApi.scrollNext(), 4000);
      setAutoPlayInterval(interval);
    } else if (!isPlaying && autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }

    return () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
    };
  }, [isPlaying, emblaApi, autoPlayInterval]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleAddToCart = (product: Product) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">Featured Collection</h2>
          <p className="text-xl text-gray-600">Our top picks for your next project</p>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {featuredProducts.map((product) => (
                <div key={product.id} className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2">
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center h-full flex flex-col">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4 flex-shrink-0" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-2xl font-bold text-primary mb-4">₹{product.price.toLocaleString()}</p>
                      </div>
                      <Button 
                        onClick={() => handleAddToCart(product)} 
                        className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-200 font-medium py-3"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={scrollPrev} 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full transition-all duration-200 z-10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={scrollNext} 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full transition-all duration-200 z-10"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
          
          {/* Play/Pause Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={togglePlay} 
            className="absolute right-20 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full transition-all duration-200 z-10"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  'h-3 w-3 rounded-full transition-all duration-300 cursor-pointer',
                  index === selectedIndex ? 'bg-primary scale-110 shadow-md' : 'bg-gray-300 hover:bg-primary/50'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;