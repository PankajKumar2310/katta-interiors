import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const galleryItems = [
  { id: 1, image: '/images/gallery/sleek-kitchen-dark.png', title: 'Sleek Kitchen', category: 'Sunmica', aspect: 'portrait' },
  { id: 2, image: '/images/gallery/sleek-kitchen-white.png', title: 'Modern Kitchen', category: 'Sunmica', aspect: 'portrait' },
  { id: 3, image: '/images/gallery/cozy-living.png', title: 'Cozy Living', category: 'Sunmica', aspect: 'square' },
  { id: 4, image: '/images/gallery/elegant-bedroom.png', title: 'Elegant Bedroom', category: 'Panels', aspect: 'wide' },
  { id: 5, image: '/images/gallery/modern-commercial.png', title: 'Modern Commercial', category: 'Sunmica', aspect: 'portrait' },
  { id: 6, image: '/images/gallery/warm-decor.png', title: 'Warm Decor', category: 'Panels', aspect: 'landscape' },
];

const InspirationGallery = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">Inspiration Gallery</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how our materials transform spaces.
          </p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item) => (
            <Link key={item.id} to={`/projects/${item.id}`} className="block group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-out bg-white">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-auto block object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="text-left w-full">
                  <h3 className="text-white font-semibold text-xl mb-2 drop-shadow-lg">{item.title}</h3>
                  <p className="text-teal-200 text-sm mb-4 opacity-90">{item.category}</p>
                  <Button variant="ghost" className="border-white/50 text-white hover:bg-white/20 rounded-full flex items-center gap-2 transition-all">
                    View Project
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
              {/* Overlay icon for non-hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="h-8 w-8 text-white/80" />
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/projects">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 rounded-full px-8 py-3 text-base">
              See More Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InspirationGallery;