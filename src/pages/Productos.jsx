import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const productosData = [
  { id: 1, img: "/src/assets/images/pastel-1.png", titulo: "Torta Cuadrada de Chocolate", precio: "CLP 10.000", tipo: "cuadrada" },
  { id: 2, img: "/src/assets/images/pastel-2.png", titulo: "Torta Cuadrada de Frutas", precio: "CLP 10.000", tipo: "cuadrada" },
  { id: 3, img: "/src/assets/images/pastel-1.png", titulo: "Torta Circular de Vainilla", precio: "CLP 10.000", tipo: "circular" },
  { id: 4, img: "src/assets/images/pastel-2.png", titulo: "Torta Circular de Manjar", precio: "CLP 10.000", tipo: "circular" },
];

export default function Productos() {
  const [filtroTipo, setFiltroTipo] = useState("todos");

  // Función que filtra según el tipo
  const productosFiltrados = productosData.filter(p => {
    if (filtroTipo === "todos") return true;
    return p.tipo === filtroTipo;
  });

  return (
    <main className="container">
      <h2 className="titulo-pagina">Nuestros Productos</h2>

      <div className="filtros">
        <button onClick={() => setFiltroTipo("todos")}>Todos</button>
        <button onClick={() => setFiltroTipo("cuadrada")}>Torta Cuadrada</button>
        <button onClick={() => setFiltroTipo("circular")}>Torta Circular</button>
      </div>

      <section className="catalogo">
        {productosFiltrados.map(p => (
          <ProductCard
            key={p.id}
            img={p.img}
            titulo={p.titulo}
            precio={p.precio}
          />
        ))}
      </section>
    </main>
  );
}
