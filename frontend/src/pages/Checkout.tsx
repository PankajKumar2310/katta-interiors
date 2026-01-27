import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Smartphone, Banknote, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [isGuest, setIsGuest] = useState(true);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', payment: 'card',
  });
  const [submitted, setSubmitted] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18;
  const shipping = 100; // Mock
  const total = subtotal + tax + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock payment and order
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white font-poppins flex items-center justify-center py-20">
        <Navigation />
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-playfair font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-8">Thank you for your purchase. Order ID: #12345</p>
          <Link to="/">
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-8">Checkout</h1>
          <form onSubmit={handleSubmit}>
            {/* Guest/Login Toggle */}
            <div className="mb-8">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGuest}
                  onChange={(e) => setIsGuest(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Continue as Guest</span>
              </label>
              {!isGuest && <p className="text-sm text-gray-500 mt-1">Login to your account for faster checkout.</p>}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            {/* Shipping Address */}
            <div className="space-y-4 mb-8">
              <Input
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
                <Input
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  required
                />
                <Input
                  placeholder="ZIP Code"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
              <RadioGroup value={formData.payment} onValueChange={(value) => setFormData({ ...formData, payment: value })}>
                <div className="space-y-2">
                  <Card>
                    <CardContent className="p-4 flex items-center space-x-3">
                      <RadioGroupItem value="card" id="card" />
                      <label htmlFor="card" className="cursor-pointer flex items-center space-x-2">
                        <CreditCard className="h-5 w-5" />
                        <span>Credit/Debit Card</span>
                      </label>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center space-x-3">
                      <RadioGroupItem value="upi" id="upi" />
                      <label htmlFor="upi" className="cursor-pointer flex items-center space-x-2">
                        <Smartphone className="h-5 w-5" />
                        <span>UPI</span>
                      </label>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center space-x-3">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <label htmlFor="netbanking" className="cursor-pointer flex items-center space-x-2">
                        <Banknote className="h-5 w-5" />
                        <span>Net Banking</span>
                      </label>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center space-x-3">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <label htmlFor="wallet" className="cursor-pointer flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span>Wallets / Pay Later</span>
                      </label>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
            </div>

            {/* Order Summary */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">Subtotal: ₹{subtotal}</div>
                  <div className="flex justify-between">GST (18%): ₹{tax.toFixed(2)}</div>
                  <div className="flex justify-between">Shipping: ₹{shipping}</div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    Total: ₹{total.toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-4">
              Place Order
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;