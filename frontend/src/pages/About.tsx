import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <section className="relative h-96 bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center text-white">
        <div className="text-center px-4">
          <h1 className="text-5xl font-playfair font-bold mb-4">About Katta Interiors</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">Crafting premium interiors with innovation and elegance.</p>
        </div>
      </section>
      <div className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-playfair font-bold text-center text-gray-900 mb-8">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed text-center font-poppins">
          At Katta Interiors, we specialize in premium Sunmica laminates and innovative Panels, delivering materials that transform spaces into modern masterpieces. 
          Trusted by architects, interior designers, and homeowners, our commitment to quality and design excellence sets us apart in the home improvement industry.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;