import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const blogPosts = [
  { id: 1, title: 'Top Sunmica Trends for 2024', excerpt: 'Discover the latest in laminate designs...', date: 'Jan 15, 2024', image: 'https://via.placeholder.com/400x200/teal/white?text=Trends' },
  { id: 2, title: 'How to Choose Panels for Your Home', excerpt: 'Guide to selecting the perfect panels...', date: 'Jan 10, 2024', image: 'https://via.placeholder.com/400x200/gray/white?text=Panels' },
  { id: 3, title: 'Sustainable Interior Materials', excerpt: 'Eco-friendly options with Sunmica...', date: 'Jan 5, 2024', image: 'https://via.placeholder.com/400x200/green/white?text=Sustainable' },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-center text-gray-900 mb-16">Blog & Ideas</h1>
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <div className="flex text-sm text-gray-500 mb-2">{post.date}</div>
                  <Link to={`/blog/${post.id}`} className="block">
                    <h2 className="text-2xl font-semibold text-gray-900 hover:text-teal-600 transition-colors mb-2">{post.title}</h2>
                  </Link>
                  <p className="text-gray-600">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;