import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects / Inspiration', path: '/projects' },
  { label: 'About Us', path: '/about' },
  { label: 'Blog / Ideas', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const shopSubcategories = {
  Sunmica: ['1mm – Kridha', '0.8mm – Rockstar', 'Doorskin – Rockstar', '1.3mm – Thermoluxe', 'Pastels – Trustlam'],
  Panels: ['Louvers', 'Sheets', 'Iris Curve'],
};

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/shop', { state: { search: searchQuery } });
      setSearchQuery('');
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  };

  const handleUserIconClick = () => {
    if (user) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold font-playfair text-gray-900 hover:text-primary transition-colors duration-200">
            Katta Interiors
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Nav Links */}
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-primary font-medium transition-all duration-200 px-2 py-2 rounded-md hover:bg-primary/5"
                >
                  {item.label}
                </Link>
              ))}
              {/* Shop Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium px-2 py-2 rounded-md hover:bg-primary/5 transition-all duration-200">
                  <span>Shop</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-gray-200 rounded-xl shadow-lg">
                  {Object.entries(shopSubcategories).map(([category, subs]) => (
                    <div key={category} className="p-2">
                      <h3 className="font-semibold text-gray-900 px-2 py-1 text-sm border-b border-gray-100 mb-2">{category}</h3>
                      {subs.map((sub) => (
                        <DropdownMenuItem 
                          key={sub} 
                          onClick={() => navigate('/shop', { state: { category, subcategory: sub } })}
                          className="cursor-pointer hover:bg-primary/5 rounded-md px-3 py-2 text-sm"
                        >
                          {sub}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-2">
              <form onSubmit={handleSearch} className="relative flex-shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-48 h-10 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-full transition-all duration-200 bg-white/80"
                />
              </form>
              <Button variant="ghost" size="icon" asChild className="hover:bg-primary/5 rounded-full transition-all duration-200 h-10 w-10 p-0">
                <Link to="/wishlist">
                  <Heart className="h-5 w-5 text-gray-700 hover:text-primary transition-colors duration-200" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="relative hover:bg-primary/5 rounded-full transition-all duration-200 h-10 w-10 p-0">
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleUserIconClick} className="hover:bg-primary/5 rounded-full transition-all duration-200 h-10 w-10 p-0">
                <User className="h-5 w-5 text-gray-700 hover:text-primary transition-colors duration-200" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/5 rounded-full transition-all duration-200 h-10 w-10 p-0">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm bg-white border-l border-gray-200 p-0 flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <form onSubmit={handleSearch} className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-full transition-all duration-200"
                    />
                  </form>
                  <div className="flex flex-col space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="text-gray-700 hover:text-primary hover:bg-primary/5 py-2 px-3 rounded-md transition-all duration-200 text-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    {/* Mobile Shop Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-full text-left py-2 px-3 rounded-md hover:bg-primary/5 transition-all text-lg flex justify-between items-center">
                        <span>Shop</span>
                        <ChevronDown className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full ml-4">
                        {Object.entries(shopSubcategories).map(([category, subs]) => (
                          <div key={category}>
                            <h3 className="font-semibold px-2 py-1 text-sm">{category}</h3>
                            {subs.map((sub) => (
                              <DropdownMenuItem 
                                key={sub} 
                                onClick={() => {
                                  navigate('/shop', { state: { category, subcategory: sub } });
                                  setIsMobileMenuOpen(false);
                                }}
                                className="cursor-pointer hover:bg-primary/5 px-3 py-2 text-sm"
                              >
                                {sub}
                              </DropdownMenuItem>
                            ))}
                          </div>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 grid grid-cols-3 gap-2">
                  <Button variant="outline" asChild className="flex-col h-auto py-2">
                    <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
                      <Heart className="h-5 w-5 mb-1" />
                      Wishlist
                    </Link>
                  </Button>
                  <Button asChild className="flex-col h-auto py-2 relative">
                    <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                      <ShoppingCart className="h-5 w-5 mb-1" />
                      Cart
                      {cartCount > 0 && (
                        <span className="absolute top-1 right-1 bg-white text-primary text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      handleUserIconClick();
                      setIsMobileMenuOpen(false);
                    }} 
                    className="flex-col h-auto py-2"
                  >
                    <User className="h-5 w-5 mb-1" />
                    {user ? 'Account' : 'Login'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;