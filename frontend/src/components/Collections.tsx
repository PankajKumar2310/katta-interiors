import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const collections = [
  {
    title: "Tech Essentials",
    description: "Innovative gadgets for everyday luxury.",
    bg: "from-blue-900/10 to-indigo-900/10",
    icon: "💻",
  },
  {
    title: "Home Decor",
    description: "Timeless pieces for modern spaces.",
    bg: "from-emerald-900/10 to-teal-900/10",
    icon: "🏠",
  },
  {
    title: "Accessories",
    description: "Subtle additions that elevate your style.",
    bg: "from-slate-900/10 to-gray-900/10",
    icon: "⌚",
  },
];

const Collections = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className={cn(
                "relative h-64 rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 transform hover:scale-105",
                `bg-gradient-to-br ${collection.bg}`
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="relative h-full flex flex-col items-center justify-center text-center p-8 text-white">
                <div className="text-6xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">{collection.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                <p className="text-gray-200 mb-6">{collection.description}</p>
                <Button variant="ghost" className="border-white/50 hover:bg-white/10 rounded-full">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;