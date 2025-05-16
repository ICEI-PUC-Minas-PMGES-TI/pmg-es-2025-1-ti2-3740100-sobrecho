import { useState, useEffect } from 'react';

const useCart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Carregar itens do localStorage quando o hook é inicializado
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const addItem = (item) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );

      if (existingItem) {
        // Se o item já existe, aumenta a quantidade
        const updatedItems = currentItems.map((i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        // Se o item não existe, adiciona ao carrinho
        const newItems = [...currentItems, { ...item, quantity: 1 }];
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        return newItems;
      }
    });
  };

  const removeItem = (itemToRemove) => {
    setItems((currentItems) => {
      const updatedItems = currentItems.filter(
        (item) =>
          !(
            item.id === itemToRemove.id &&
            item.size === itemToRemove.size &&
            item.color === itemToRemove.color
          )
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const updateQuantity = (itemToUpdate, newQuantity) => {
    if (newQuantity < 1) return;

    setItems((currentItems) => {
      const updatedItems = currentItems.map((item) =>
        item.id === itemToUpdate.id &&
        item.size === itemToUpdate.size &&
        item.color === itemToUpdate.color
          ? { ...item, quantity: newQuantity }
          : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cartItems');
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
  };
};

export default useCart; 