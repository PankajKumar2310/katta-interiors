import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-teal-50 to-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/images/hero-background.png')" }} />
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 leading-tight text-foreground drop-shadow-2xl">
          Premium Materials
          <br className="hidden md:block" />
          for Modern Spaces
        </h1>
        <p className="text-lg md:text-xl font-poppins mb-8 max-w-xl mx-auto text-foreground/90 drop-shadow-lg">
          Durable Sunmica & Panels trusted by designers.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="px-8 py-3 text-base bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg font-medium drop-shadow-lg">
            <Link to="/shop?category=Sunmica">
              Explore Sunmica
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 py-3 text-base bg-background/20 border-foreground/80 text-foreground hover:bg-background/30 hover:border-foreground hover:scale-105 transition-all duration-200 rounded-full drop-shadow-lg">
            <Link to="/shop?category=Panels">
              View Panels
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;