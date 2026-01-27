import React from 'react';
import { CheckCircle, Shield, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Sourced from top manufacturers for lasting durability and elegance.',
  },
  {
    icon: Star,
    title: 'Trusted by Architects',
    description: 'Preferred choice for professional interior projects nationwide.',
  },
  {
    icon: CheckCircle,
    title: 'Durable Finishes',
    description: 'Resistant to heat, moisture, and daily wear for long-term beauty.',
  },
];

const WhyChooseKatta = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Why Choose Katta Interiors?</h2>
        <p className="text-xl font-poppins text-gray-600">
          Excellence in every sheet and panel.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {benefits.map((benefit, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shadow-md group-hover:shadow-primary/20 transition-shadow duration-300">
                <benefit.icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold font-playfair text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 font-poppins leading-relaxed">{benefit.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseKatta;