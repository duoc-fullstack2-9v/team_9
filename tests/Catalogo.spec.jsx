import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "./test-utils";
import Catalogo from "../src/components/Catalogo";

describe("Catalogo", () => {
  it("muestra una tarjeta con título y precio", () => {
    renderWithRouter(<Catalogo />);
    expect(screen.getByText(/torta cuadrada de chocolate/i)).toBeInTheDocument();
    expect(screen.getByText(/clp 10\.000/i)).toBeInTheDocument();
  });
});
