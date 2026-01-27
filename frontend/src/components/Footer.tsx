import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company & Contact */}
        <div>
          <h3 className="text-2xl font-playfair font-bold mb-4">Katta Interiors</h3>
          <p className="text-gray-400 font-poppins mb-4">Premium Sunmica and Panels for modern interiors.</p>
          <div className="space-y-2 text-gray-400 mb-4">
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
              <span>Jaipur, Rajasthan, India</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
              <a href="tel:+918005708058" className="hover:text-primary transition-colors">+91 8005708058</a>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
              <a href="mailto:mr.kattas1@gmail.com" className="hover:text-primary transition-colors">mr.kattas1@gmail.com</a>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 rounded-full">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 rounded-full">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 rounded-full">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 rounded-full">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
            <li><Link to="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Policies</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <p className="text-gray-400 mb-4">Subscribe for design tips and exclusive offers.</p>
          <div className="flex rounded-full overflow-hidden bg-primary/10">
            <Input placeholder="Your email" className="bg-transparent border-0 text-white placeholder-gray-300 px-4 font-poppins" />
            <Button className="bg-primary hover:bg-primary/90 rounded-r-full">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 Katta Interiors. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;