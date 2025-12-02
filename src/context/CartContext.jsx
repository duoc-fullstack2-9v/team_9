// src/context/CartContext.jsx

// Importamos los módulos necesarios desde React
// createContext → crea un contexto global una caja de datos compartida
// useContext → permite acceder a ese contexto desde otros componentes
// useState → crea variables de estado que actualizan la vista cuando cambian
// useEffect → ejecuta código automáticamente cuando cambian ciertos valores
import React, { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto del carrito
// Este contexto almacenará toda la información y funciones del carrito
const CartContext = createContext();

// Hook personalizado que facilita el acceso al contexto del carrito
// En lugar de tener que importar useContext y CartContext por separado,
// podemos simplemente usar useCart() en cualquier componente.
export const useCart = () => {
  return useContext(CartContext);
};

// Componente proveedor del contexto (Provider)
// Este componente envuelve toda la aplicación y "distribuye" el carrito
// a todos los componentes hijos (children)
export const CartProvider = ({ children }) => {

  // Estado principal del carrito (array de productos)
  // Al iniciar, se intenta leer los productos almacenados en localStorage.
  const [cartItems, setCartItems] = useState(() => {
    // Se busca si existe algo guardado previamente en localStorage bajo la clave 'cartItems'
    const stored = localStorage.getItem('cartItems');
    // Si existe, se convierte de texto (JSON) a objeto con JSON.parse()
    // Si no existe, se devuelve un arreglo vacío []
    return stored ? JSON.parse(stored) : [];
  });

  // useEffect → ejecuta un efecto cada vez que cambia el carrito (cartItems)
  useEffect(() => {
    // Guardamos el carrito en localStorage para mantenerlo incluso si el usuario recarga la página
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]); // ← dependencia: solo se ejecuta cuando cartItems cambia

  // Función para agregar un producto al carrito
  const addItem = (product) => {
    // setCartItems actualiza el estado del carrito
    // prevItems → representa el estado anterior
    setCartItems(prevItems => {
      // Buscamos si el producto ya existe en el carrito
      const existing = prevItems.find(item => item.id === product.id);
      
      // Si ya existe, se incrementa la cantidad
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 } // suma 1
            : item
        );
      } else {
        // Si no existe, se agrega un nuevo producto con cantidad inicial 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto completamente del carrito
  const removeItem = (productId) => {
    // Filtra todos los productos que sean distintos al que queremos eliminar
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Función para aumentar la cantidad de un producto
  const increaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 } // suma 1
          : item
      )
    );
  };

  // Función para disminuir la cantidad de un producto
  const decreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.flatMap(item => {
        // Si encontramos el producto:
        if (item.id === productId) {
          // Si tiene más de una unidad, restamos 1
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // Si solo quedaba una unidad, lo eliminamos del carrito (retornamos [])
            return [];
          }
        }
        // Si no es el producto que buscamos, lo dejamos igual
        return item;
      })
    );
  };

  // Función para calcular el total del carrito
  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      // Convertimos el precio (que viene como texto "CLP 10.000") a número 10000
      const priceNumber = Number(item.precio.replace(/[^0-9]/g, '')); 
      // Multiplicamos el precio por la cantidad de ese producto
      return sum + priceNumber * item.quantity;
    }, 0); // sum empieza desde 0
  };

  // Objeto con todas las funciones y datos del carrito
  // Este es el "valor" que se compartirá a través del contexto
  const value = {
    cartItems,          // lista de productos
    addItem,            // función para agregar
    removeItem,         // función para eliminar
    increaseQuantity,   // función para sumar cantidad
    decreaseQuantity,   // función para restar cantidad
    getTotal            // función para calcular total
  };

  // Retornamos el proveedor del contexto
  // Todo componente hijo dentro del CartProvider podrá usar useCart()
  return (
    <CartContext.Provider value={value}>
      {children} {}
    </CartContext.Provider>
  );
};
