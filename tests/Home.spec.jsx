import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "./test-utils";
import Home from "../src/pages/Home";

describe("Página Home", () => {
  it("renderiza el <main>", () => {
    renderWithRouter(<Home />);
    const main = screen.getByRole("main", { hidden: true });
    expect(main).toBeInTheDocument();
  });

  it("muestra el Hero (heading)", () => {
    renderWithRouter(<Home />);
    expect(
      screen.getByRole("heading", { name: /pastelería mil sabores/i })
    ).toBeInTheDocument();
  });

  it("muestra el Catálogo (producto de ejemplo)", () => {
    renderWithRouter(<Home />);
    expect(
      screen.getByText(/torta cuadrada de chocolate/i)
    ).toBeInTheDocument();
  });
});

