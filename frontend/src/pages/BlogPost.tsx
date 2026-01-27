import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPostData: { [key: string]: {
    title: string;
    content: string;
    date: string;
    author: string;
    related: number[];
}} = {
  '1': {
    title: 'Top Sunmica Trends for 2024',
    content: `
      <p>Sunmica laminates continue to dominate interior design in 2024 with innovative textures and sustainable materials. Here's what architects and designers are loving this year.</p>
      
      <h2>Matte Finishes Take Center Stage</h2>
      <p>Goodbye gloss, hello matte! The subtle elegance of matte Sunmica is perfect for modern minimalist spaces. Brands like Rockstar offer durable options that resist fingerprints and maintain their look over time.</p>
      
      <h2>Sustainable Choices</h2>
      <p>With eco-conscious clients on the rise, recycled laminates and low-VOC options are trending. Trustlam's pastel collection combines sustainability with soft-touch finishes.</p>
      
      <h2>Textured Innovations</h2>
      <p>From wood-grain effects to stone textures, Sunmica is mimicking natural materials better than ever. Ideal for accent walls and furniture that feels premium without the premium price.</p>
      
      <p>Ready to incorporate these trends? Explore our collection and elevate your next project.</p>
    `,
    date: 'January 15, 2024',
    author: 'Design Team',
    related: [2, 3],
  },
  '2': {
    title: 'How to Choose Panels for Your Home',
    content: `
      <p>Panels can transform any space, but choosing the right one depends on your needs. Here's a guide to help you decide between louvers, sheets, and more.</p>
      
      <h2>Louvers for Light Control</h2>
      <p>Aluminum or wooden louvers are perfect for windows and partitions. They offer privacy while allowing natural light to filter through.</p>
      
      <h2>Sheets for Versatility</h2>
      <p>PVC and acrylic sheets work great for false ceilings, wall cladding, and custom installations. Choose based on thickness and finish for your specific application.</p>
      
      <h2>Installation Tips</h2>
      <p>Always consult a professional for load-bearing panels. Proper installation ensures longevity and safety.</p>
    `,
    date: 'January 10, 2024',
    author: 'Interior Expert',
    related: [1, 3],
  },
  // Add more
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPostData[id] : undefined;

  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/blog" className="flex items-center mb-8 text-teal-600 hover:text-teal-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blog
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">{post.title}</h1>
              <div className="flex items-center space-x-4 text-gray-500 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
              </div>
            </header>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Related Posts */}
            <div className="mb-12">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {post.related.map((relId) => {
                  const relPost = blogPostData[relId.toString()];
                  if (!relPost) return null;
                  return (
                    <Link key={relId} to={`/blog/${relId}`} className="block hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Featured Image</span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">{relPost.title}</h3>
                        <p className="text-gray-600 text-sm">{relPost.date}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Comments Stub */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold mb-4">Comments</h3>
              <p className="text-gray-500 italic">Comments coming soon. Share your thoughts!</p>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;