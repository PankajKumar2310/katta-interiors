import React, { createContext, useContext, useReducer, useEffect } from 'react';

type WishlistState = string[]; // Array of product IDs

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; id: string }
  | { type: 'REMOVE_FROM_WISHLIST'; id: string }
  | { type: 'TOGGLE_WISHLIST'; id: string };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (!state.includes(action.id)) {
        return [...state, action.id];
      }
      return state;
    case 'REMOVE_FROM_WISHLIST':
      return state.filter(id => id !== action.id);
    case 'TOGGLE_WISHLIST':
      return state.includes(action.id)
        ? state.filter(id => id !== action.id)
        : [...state, action.id];
    default:
      return state;
  }
};

const WishlistContext = createContext<{
  wishlist: WishlistState;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
} | null>(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, [], () => {
    const saved = localStorage.getItem('katta-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('katta-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (id: string) => {
    dispatch({ type: 'ADD_TO_WISHLIST', id });
  };

  const removeFromWishlist = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', id });
  };

  const toggleWishlist = (id: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', id });
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};