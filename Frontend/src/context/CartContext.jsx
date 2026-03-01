import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'esscentials_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Load cart from localStorage on first mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage', error);
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          image_url: product.image_url || '',
          quantity: quantity > 0 ? quantity : 1,
        },
      ];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (!existing) return prev;

      // Remove item if quantity drops below 1
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== productId);
      }

      return prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const incrementQuantity = (productId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const { total, itemCount } = useMemo(() => {
    const totals = items.reduce(
      (acc, item) => {
        const lineTotal = (Number(item.price) || 0) * (item.quantity || 0);
        acc.total += lineTotal;
        acc.itemCount += item.quantity || 0;
        return acc;
      },
      { total: 0, itemCount: 0 }
    );
    return totals;
  }, [items]);

  const value = {
    items,
    addToCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

