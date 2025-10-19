import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const productosData = [
  { id: 1, img: "/src/assets/images/pastel-1.png", titulo: "Torta Cuadrada de Chocolate", precio: "CLP 10.000", tipo: "cuadrada" },
  { id: 2, img: "/src/assets/images/pastel-2.png", titulo: "Torta Cuadrada de Frutas",   precio: "CLP 10.000", tipo: "cuadrada" },
  { id: 3, img: "/src/assets/images/pastel-1.png", titulo: "Torta Circular de Vainilla",  precio: "CLP 10.000", tipo: "circular" },
  { id: 4, img: "/src/assets/images/pastel-2.png", titulo: "Torta Circular de Manjar",    precio: "CLP 10.000", tipo: "circular" }, // <- ojo, aquí te faltaba la primera "/"
];

export default function Productos() {
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const { addItem } = useCart();

  const productosFiltrados = productosData.filter(p =>
    filtroTipo === "todos" ? true : p.tipo === filtroTipo
  );

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
            id={p.id}
            img={p.img}
            titulo={p.titulo}
            precio={p.precio}
            onAdd={() => {
              addItem({ id: p.id, img: p.img, titulo: p.titulo, precio: p.precio });
              alert(`${p.titulo} agregado al carrito ✅`);
            }}
          />
        ))}
      </section>
    </main>
  );
}
