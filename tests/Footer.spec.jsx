import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "./test-utils";
import Footer from "../src/components/Footer";

describe("Footer", () => {
  it("muestra el nombre y logos de pago", () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/pasteleria mil sabores/i)).toBeInTheDocument();
    expect(screen.getByAltText(/visa/i)).toBeInTheDocument();
    expect(screen.getByAltText(/mastercard/i)).toBeInTheDocument();
    expect(screen.getByAltText(/webpay/i)).toBeInTheDocument();
  });

  it("muestra el formulario de suscripción", () => {
    renderWithRouter(<Footer />);
    expect(
      screen.getByLabelText(/inscribete para obtener descuentos/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ingresa tu email/i)).toBeRequired();
    expect(screen.getByRole("button", { name: /suscribirse/i })).toBeInTheDocument();
  });

  it("al enviar el formulario no navega", () => {
    renderWithRouter(<Footer />);
    const button = screen.getByRole("button", { name: /suscribirse/i });
    const form = button.closest("form");
    const input = screen.getByPlaceholderText(/ingresa tu email/i);
    input.value = "test@example.com";
    fireEvent.submit(form);
    expect(input).toHaveValue("test@example.com");
  });
});
