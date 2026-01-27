import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const projects = [
  { id: 1, title: 'Modern Kitchen Renovation', image: 'https://via.placeholder.com/400x300/teal/white?text=Kitchen', category: 'Sunmica' },
  { id: 2, title: 'Office Louver Design', image: 'https://via.placeholder.com/400x300/gray/white?text=Office', category: 'Panels' },
  { id: 3, title: 'Luxury Bedroom', image: 'https://via.placeholder.com/400x300/gold/white?text=Bedroom', category: 'Sunmica' },
  { id: 4, title: 'Commercial Space', image: 'https://via.placeholder.com/400x300/black/white?text=Commercial', category: 'Panels' },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-center text-gray-900 mb-16">Projects & Inspiration</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="block group">
                <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all">
                  <img src={project.image} alt={project.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm opacity-90">{project.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Projects;