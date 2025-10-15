function ProductCard({ img, titulo, precio }) {
  return (
    <article className="producto">
      <div className="producto-media">
        <img src={img} alt={titulo} />
      </div>
      <a href="#" className="producto-titulo">{titulo}</a>
      <div className="producto-fila">
        <span className="producto-attrs">Precio</span>
        <span className="producto-precio">{precio}</span>
      </div>
    </article>
  );
}

export default ProductCard;