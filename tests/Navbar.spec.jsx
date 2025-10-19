import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "./test-utils";
import Navbar from "../src/components/Navbar";

describe("Navbar", () => {
  it("muestra el logo", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  it("muestra los enlaces principales", () => {
    renderWithRouter(<Navbar />);
    const links = [
      { name: /inicio/i, href: "/" },
      { name: /productos/i, href: "/productos" },
      { name: /iniciar sesión/i, href: "/login" },
      { name: /registrarse/i, href: "/registro" },
      { name: /contacto/i, href: "/contacto" },
      { name: /sobre nosotros/i, href: "/nosotros" },
      { name: /blog/i, href: "/blog" },
    ];
    for (const { name, href } of links) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
  });

  it("muestra el link del carrito con contador", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole("link", { name: /carro \(0\)/i })).toHaveAttribute("href", "/carrito");
  });
});
