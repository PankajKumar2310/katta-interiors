import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CategoryHighlights from '@/components/CategoryHighlights';
import FeaturedProducts from '@/components/FeaturedProducts';
import WhyChooseKatta from '@/components/WhyChooseKatta';
import InspirationGallery from '@/components/InspirationGallery';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <Hero />
      <CategoryHighlights />
      <FeaturedProducts />
      <WhyChooseKatta />
      <InspirationGallery />
      <Footer />
    </div>
  );
};

export default Index;