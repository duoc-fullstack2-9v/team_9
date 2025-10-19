// tests/Carrito.spec.jsx
import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "./test-utils";
import Carrito from "../src/pages/Carrito";

// Hacemos un mock del módulo del contexto.
// OJO: usamos una variable que reconfiguramos por test.
let mockCart;
vi.mock("../src/context/CartContext", () => ({
  useCart: () => mockCart,
}));

describe("Carrito (CRUD)", () => {
  beforeEach(() => {
    // valores por defecto para evitar undefined
    mockCart = {
      cartItems: [],
      removeItem: vi.fn(),
      increaseQuantity: vi.fn(),
      decreaseQuantity: vi.fn(),
      getTotal: vi.fn(() => 0),
    };
  });

  it("muestra el estado vacío cuando no hay items", () => {
    mockCart.cartItems = [];
    mockCart.getTotal.mockReturnValue(0);

    renderWithRouter(<Carrito />);
    expect(screen.getByRole("heading", { name: /mi carrito de compras/i })).toBeInTheDocument();
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
    expect(screen.getByText(/CLP 0/i)).toBeInTheDocument();
  });

  it("renderiza items con su info y muestra el total", () => {
    mockCart.cartItems = [
      {
        id: 10,
        img: "/src/assets/images/pastel-1.png",
        titulo: "Torta Cuadrada de Chocolate",
        precio: "CLP 10.000",
        quantity: 2,
      },
      {
        id: 11,
        img: "/src/assets/images/pastel-2.png",
        titulo: "Torta Circular de Vainilla",
        precio: "CLP 10.000",
        quantity: 1,
      },
    ];
    // Simulamos que el total (numérico) es 30000 para que Carrito muestre "CLP 30,000"
    mockCart.getTotal.mockReturnValue(30000);

    renderWithRouter(<Carrito />);

    // Títulos de los ítems
    expect(screen.getByText(/torta cuadrada de chocolate/i)).toBeInTheDocument();
    expect(screen.getByText(/torta circular de vainilla/i)).toBeInTheDocument();

    // Subtotales (usa `${item.quantity} × ${item.precio}`)
    expect(screen.getByText(/2 × CLP 10\.000/i)).toBeInTheDocument();
    expect(screen.getByText(/1 × CLP 10\.000/i)).toBeInTheDocument();

    // Total formateado
    // tests/Carrito.spec.jsx (reemplaza SOLO la aserción del total)
    // Total formateado (selecciono el nodo exacto)

    const totalMonto = document.querySelector(".total-monto");
    expect(totalMonto).toBeInTheDocument();
    expect(totalMonto).toHaveTextContent(/CLP\s*30\.000/i);

  });

  it("dispara increase/decrease/remove con el id correcto", () => {
    mockCart.cartItems = [
      {
        id: 22,
        img: "/x.png",
        titulo: "Producto X",
        precio: "CLP 10.000",
        quantity: 3,
      },
    ];
    mockCart.getTotal.mockReturnValue(30000);

    renderWithRouter(<Carrito />);

    const minus = screen.getByRole("button", { name: "-" });
    const plus = screen.getByRole("button", { name: "+" });
    const remove = screen.getByRole("button", { name: /eliminar/i });

    fireEvent.click(minus);
    fireEvent.click(plus);
    fireEvent.click(remove);

    expect(mockCart.decreaseQuantity).toHaveBeenCalledWith(22);
    expect(mockCart.increaseQuantity).toHaveBeenCalledWith(22);
    expect(mockCart.removeItem).toHaveBeenCalledWith(22);
  });
});
