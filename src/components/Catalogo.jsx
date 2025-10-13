import ProductCard from "./ProductCard";

const productos = [
  { img: "/src/assets/images/pastel-1.png", titulo: "Torta Cuadrada de Chocolate", precio: "CLP 10.000" },
];

function Catalogo() {
  return (
    <section className="catalogo">
      {productos.map((p, idx) => (
        <ProductCard key={idx} img={p.img} titulo={p.titulo} precio={p.precio} />
      ))}
    </section>
  );
}

export default Catalogo;