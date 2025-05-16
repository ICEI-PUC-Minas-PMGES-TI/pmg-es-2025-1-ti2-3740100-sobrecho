'use client';

import { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  bargain?: {
    wantsBargain: boolean;
    proposedPrice: number | null;
  };
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = (item: Omit<CartItem, 'quantity' | 'bargain'>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      let newItems;

      if (existingItem) {
        newItems = prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        newItems = [...prevItems, { ...item, quantity: 1, bargain: { wantsBargain: false, proposedPrice: null } }];
      }

      saveCart(newItems);
      return newItems;
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== itemId);
      saveCart(newItems);
      return newItems;
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      saveCart(newItems);
      return newItems;
    });
  };

  const updateBargain = (itemId: number, wantsBargain: boolean, proposedPrice: number | null) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === itemId
          ? { ...item, bargain: { wantsBargain, proposedPrice } }
          : item
      );
      saveCart(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getTotal = () => {
    // Total calculado com base no preço padrão (não considerando pechincha)
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateBargain,
    clearCart,
    getTotal,
  };
};
