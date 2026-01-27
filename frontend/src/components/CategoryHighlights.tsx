import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/constants/catalog';

const CategoryHighlights = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-playfair font-bold text-center text-gray-900 mb-16">Explore Our Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                style={{ 
                  backgroundImage: category.name === 'Sunmica' 
                    ? "url('/images/sunmica-materials.png')" 
                    : "url('/images/panels-materials.png')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="relative p-8 text-white h-full flex flex-col justify-end">
                <h3 className="text-3xl font-playfair font-bold mb-2">{category.name}</h3>
                <p className="font-poppins mb-6 opacity-90">{category.subcategories.length} Collections</p>
                <Link to={`/shop?category=${category.name}`}>
                  <Button variant="ghost" className="border-white hover:bg-white/20 rounded-full">
                    Explore {category.name}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;