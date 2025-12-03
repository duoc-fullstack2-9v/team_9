// src/pages/Carrito.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

export default function Carrito() {
  const { cartItems, removeItem, increaseQuantity, decreaseQuantity, getTotal } = useCart();

  return (
    <main className="container carrito-page">
      <h2 className="titulo-pagina">Mi Carrito de Compras</h2>

      <div className="carrito">
        <div className="carrito-lista">
          {cartItems.length === 0 && <p>Tu carrito está vacío.</p>}
          {cartItems.map(item => (
            <div key={item.id} className="carrito-item">
              <div className="item-media">
                <img src={item.img} alt={item.titulo} />
              </div>
              <div className="item-info">
                <h3 className="item-titulo">{item.titulo}</h3>
                <p className="item-desc">Precio unidad: {item.precio}</p>
              </div>
              <div className="item-acciones">
                <div className="item-precio">Subtotal: {
                  // puedes calcular item.precio * item.quantity como número
                  `${item.quantity} × ${item.precio}`
                }</div>
                <div className="item-cant">
                  <button className="btn-cant" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <input className="input-cant" type="text" value={item.quantity} readOnly />
                  <button className="btn-cant" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button className="btn-eliminar" onClick={() => removeItem(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>

        <div className="carrito-resumen">
          <div className="total-titulo">TOTAL:</div>
          <div className="total-monto">CLP {getTotal().toLocaleString()}</div>
          <div className="cupon-label">¿Tienes un cupón?</div>
          <div className="cupon-row">
            <input type="text" placeholder="Ingresa el cupón" />
            <button>APLICAR</button>
          </div>
          <button className="btn-pagar">PAGAR</button>
        </div>
      </div>

    </main>
  );
}