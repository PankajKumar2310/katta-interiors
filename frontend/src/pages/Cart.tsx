import React from 'react';
import { useCart } from '@/contexts/CartContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // Mock 18% GST
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white font-poppins">
        <Navigation />
        <div className="py-20 text-center">
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <Link to="/shop">
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">Continue Shopping</Button>
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border rounded-xl">
                  <img src={item.image} alt={item.name} className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-primary font-bold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="w-16 text-center"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
                  <p className="font-bold text-lg sm:text-base w-full sm:w-auto text-right sm:text-left">₹{item.price * item.quantity}</p>
                </div>
              ))}
              <Button variant="outline" onClick={clearCart} className="rounded-full">Clear Cart</Button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              <div className="space-y-2 p-6 bg-gray-50 rounded-xl">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold text-lg">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout">
                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">Proceed to Checkout</Button>
              </Link>
              <p className="text-xs text-gray-500 text-center">Shipping calculated at checkout</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;