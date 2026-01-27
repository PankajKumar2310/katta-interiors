import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

type CartState = CartItem[];

type CartAction =
  | { type: 'ADD_TO_CART'; item: Omit<CartItem, 'quantity'>; quantity?: number }
  | { type: 'REMOVE_FROM_CART'; id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item.id === action.item.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + (action.quantity || 1) }
            : item
        );
      }
      return [...state, { ...action.item, quantity: action.quantity || 1 }];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.id);
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item
      ).filter(item => item.quantity > 0);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

const CartContext = createContext<{
  cart: CartState;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
} | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const saved = localStorage.getItem('katta-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('katta-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', item, quantity });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};