import React from "react";
import { Truck, Award, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Worldwide delivery on all orders over $50.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handcrafted with the finest materials.",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "Protected payments with advanced encryption.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
        <p className="text-xl text-gray-600">
          Exceptional service and quality in every detail.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {benefits.map((benefit, index) => (
          <Card
            key={index}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0"
          >
            <CardContent className="p-8 text-center pt-12 relative">
              <benefit.icon className="absolute top-4 left-1/2 transform -translate-x-1/2 h-12 w-12 text-slate-900 opacity-80" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;