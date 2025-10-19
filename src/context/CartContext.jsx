// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // leer del localStorage al inicio si existe
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  // efecto para persistir el carrito cuando cambia
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // agregar un producto al carrito
  const addItem = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // eliminar un producto completamente
  const removeItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // cambiar cantidad: incrementar
  const increaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // cambiar cantidad: decrementar
  const decreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.flatMap(item => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // si queda 0, lo eliminamos
            return [];
          }
        }
        return item;
      })
    );
  };

  // calcular el total del carrito
  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      // asegurarte de que precio es número
      const priceNumber = Number(item.precio.replace(/[^0-9]/g, '')); 
      // ejemplo: "CLP 10.000" → 10000
      return sum + priceNumber * item.quantity;
    }, 0);
  };

  const value = {
    cartItems,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
