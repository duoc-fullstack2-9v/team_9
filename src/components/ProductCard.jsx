import React from "react";

// src/components/ProductCard.jsx
function ProductCard({ id, img, titulo, precio, onAdd }) {
  return (
    <article className="producto">
      <div className="producto-media">
        <img src={img} alt={titulo} />
      </div>
      <a href="#" className="producto-titulo">{titulo}</a>
      <div className="producto-fila">
        <span className="producto-attrs">Precio</span>
        <span className="producto-precio">{precio}</span>
        <button className="btn-agregar" onClick={onAdd}>
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
export default ProductCard;