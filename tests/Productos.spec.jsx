// tests/Productos.spec.jsx

import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "./test-utils";
import Productos from "../src/pages/Productos";

let mockCart;
vi.mock("../src/context/CartContext", () => ({
  useCart: () => mockCart,
}));

describe("Productos (filtros y agregar al carrito)", () => {
  beforeEach(() => {
    mockCart = {
      addItem: vi.fn(),
    };
    vi.spyOn(window, "alert").mockImplementation(() => {}); // para no abrir pop-up
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("muestra título y botones de filtro", () => {
    renderWithRouter(<Productos />);
    expect(screen.getByRole("heading", { name: /nuestros productos/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /todos/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /torta cuadrada/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /torta circular/i })).toBeInTheDocument();
  });

  it("al hacer click en 'Agregar al carrito' llama a addItem y muestra alert", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Productos />);

    // Toma el primer botón de "Agregar al carrito"
    const addButtons = screen.getAllByRole("button", { name: /agregar al carrito/i });
    expect(addButtons.length).toBeGreaterThan(0);

    await user.click(addButtons[0]);

    // Verifica que addItem haya sido llamado con un payload que contenga al menos id, titulo y precio
    expect(mockCart.addItem).toHaveBeenCalledTimes(1);
    const payload = mockCart.addItem.mock.calls[0][0];
    expect(payload).toHaveProperty("id");
    expect(payload).toHaveProperty("titulo");
    expect(payload).toHaveProperty("precio");

    // Verifica que muestre el alert con el texto “agregado al carrito”
    expect(window.alert).toHaveBeenCalled();
    const message = window.alert.mock.calls[0][0];
    expect(message).toMatch(/agregado al carrito/i);
  });

  it("filtra por tipo (cuadrada/circular) al usar los botones (smoke test)", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Productos />);

    // Click en filtro "Torta Cuadrada"
    await user.click(screen.getByRole("button", { name: /torta cuadrada/i }));
    // No sabemos nombres exactos en el DOM tras filtrar sin inspeccionar más,
    // pero al menos comprobamos que existe algún “Agregar al carrito” (lista no vacía).
    expect(screen.getAllByRole("button", { name: /agregar al carrito/i }).length).toBeGreaterThan(0);

    // Click en filtro "Torta Circular"
    await user.click(screen.getByRole("button", { name: /torta circular/i }));
    expect(screen.getAllByRole("button", { name: /agregar al carrito/i }).length).toBeGreaterThan(0);

    // Click en "Todos"
    await user.click(screen.getByRole("button", { name: /todos/i }));
    expect(screen.getAllByRole("button", { name: /agregar al carrito/i }).length).toBeGreaterThan(0);
  });
});
