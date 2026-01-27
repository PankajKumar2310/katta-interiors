import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    text: "Absolutely stunning quality. The design is minimalist perfection—feels like luxury in every piece.",
    rating: 5,
  },
  {
    name: "Sarah Lee",
    text: "Fast shipping and impeccable service. These products have transformed my daily routine.",
    rating: 5,
  },
  {
    name: "Mike Chen",
    text: "Premium feel without the premium price. Highly recommend for anyone seeking elegance.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
        <p className="text-xl text-gray-600">
          Real stories from our satisfied community.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border-0 overflow-hidden"
          >
            <CardContent className="p-8 pt-12 relative">
              {/* Avatar placeholder */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-slate-900 to-gray-800 rounded-full flex items-center justify-center text-white text-2xl">
                {["A", "S", "M"][index]}
              </div>
              
              <div className="flex items-center mb-4 ml-16">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-semibold text-gray-900">- {testimonial.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;