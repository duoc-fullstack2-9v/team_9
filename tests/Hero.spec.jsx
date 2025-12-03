import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "./test-utils";
import Hero from "../src/components/Hero";

describe("Hero", () => {
  it("muestra el título", () => {
    renderWithRouter(<Hero />);
    expect(
      screen.getByRole("heading", { name: /pastelería mil sabores/i })
    ).toBeInTheDocument();
  });

  it("muestra el párrafo descriptivo", () => {
    renderWithRouter(<Hero />);
    expect(
      screen.getByText(/experiencia dulce y memorable/i)
    ).toBeInTheDocument();
  });

  it("muestra la imagen del pastel", () => {
    renderWithRouter(<Hero />);
    expect(screen.getByAltText(/pastel/i)).toBeInTheDocument();
  });

  it("tiene los enlaces Productos/Login/Registro", () => {
    renderWithRouter(<Hero />);
    expect(screen.getByRole("link", { name: /productos/i })).toHaveAttribute("href", "/productos");
    expect(screen.getByRole("link", { name: /iniciar sesión/i })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("link", { name: /registrarse/i })).toHaveAttribute("href", "/registro");
  });
});
