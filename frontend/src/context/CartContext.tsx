import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Cart, Product } from '../types';

// Action types
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number; customizationRequests?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'UPDATE_CUSTOMIZATION'; payload: { productId: string; customizationRequests: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Initial state
const initialState: Cart = {
  items: [],
  subtotal: 0,
  itemCount: 0,
};

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]): { subtotal: number; itemCount: number } => {
  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  return { subtotal, itemCount };
};

// Reducer
const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'LOAD_CART': {
      const { subtotal, itemCount } = calculateTotals(action.payload);
      return {
        items: action.payload,
        subtotal,
        itemCount,
      };
    }
    
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => (item.product._id || item.product.id) === (action.payload.product._id || action.payload.product.id)
      );
      
      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + (action.payload.quantity || 1),
              customizationRequests: action.payload.customizationRequests || item.customizationRequests,
            };
          }
          return item;
        });
      } else {
        // Add new item
        newItems = [
          ...state.items,
          {
            product: action.payload.product,
            quantity: action.payload.quantity || 1,
            customizationRequests: action.payload.customizationRequests || '',
          },
        ];
      }
      
      const { subtotal, itemCount } = calculateTotals(newItems);
      
      return {
        items: newItems,
        subtotal,
        itemCount,
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => (item.product._id || item.product.id) !== action.payload);
      const { subtotal, itemCount } = calculateTotals(newItems);
      
      return {
        items: newItems,
        subtotal,
        itemCount,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item => {
        if ((item.product._id || item.product.id) === action.payload.productId) {
          return {
            ...item,
            quantity: Math.max(0, action.payload.quantity),
          };
        }
        return item;
      }).filter(item => item.quantity > 0);
      
      const { subtotal, itemCount } = calculateTotals(newItems);
      
      return {
        items: newItems,
        subtotal,
        itemCount,
      };
    }
    
    case 'UPDATE_CUSTOMIZATION': {
      const newItems = state.items.map(item => {
        if ((item.product._id || item.product.id) === action.payload.productId) {
          return {
            ...item,
            customizationRequests: action.payload.customizationRequests,
          };
        }
        return item;
      });
      
      return {
        ...state,
        items: newItems,
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
};

// Context type
interface CartContextType {
  cart: Cart;
  addItem: (product: Product, quantity?: number, customizationRequests?: string) => void;
  addToCart: (item: { id: string; title: string; price: number; image?: string; quantity: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateCustomization: (productId: string, customizationRequests: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getCartItem: (productId: string) => CartItem | undefined;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Local storage key
const CART_STORAGE_KEY = 'devneststudios_cart';

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart.items]);

  const addItem = (product: Product, quantity = 1, customizationRequests = '') => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity, customizationRequests },
    });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const updateCustomization = (productId: string, customizationRequests: string) => {
    dispatch({ type: 'UPDATE_CUSTOMIZATION', payload: { productId, customizationRequests } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (productId: string): boolean => {
    return cart.items.some(item => (item.product._id || item.product.id) === productId);
  };

  const getCartItem = (productId: string): CartItem | undefined => {
    return cart.items.find(item => (item.product._id || item.product.id) === productId);
  };

  const addToCart = (item: { id: string; title: string; price: number; image?: string; quantity: number }) => {
    // Convert simple cart item to Product for compatibility
    const product: Product = {
      _id: item.id,
      id: item.id,
      title: item.title,
      price: item.price,
      images: item.image ? [{ url: item.image, alt: item.title, isPrimary: true }] : [],
      // Add minimal required fields
      description: '',
      shortDescription: '',
      category: 'Other' as any,
      tags: [],
      features: [],
      technologies: [],
      isActive: true,
      isFeatured: false,
      deliveryTime: '3-7 business days',
      customizationOptions: { available: false, additionalCost: 0 },
      difficulty: 'Intermediate' as any,
      supportIncluded: true,
      supportDuration: '30 days',
      createdBy: {} as any,
      sales: 0,
      views: 0,
      rating: { average: 0, count: 0 },
      reviews: [],
      createdAt: new Date().toISOString() as any,
      updatedAt: new Date().toISOString() as any,
    };
    
    addItem(product, item.quantity);
  };

  const value: CartContextType = {
    cart,
    addItem,
    addToCart,
    removeItem,
    updateQuantity,
    updateCustomization,
    clearCart,
    isInCart,
    getCartItem,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};