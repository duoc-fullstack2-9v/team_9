import React from "react";
import Hero from "../components/Hero";
import Catalogo from "../components/Catalogo";

export default function Home() {
  return (
    <main className="container">
      {/* Hero principal */}
      <Hero />

      {/* Catálogo de productos */}
      <Catalogo />
    </main>
  );
}