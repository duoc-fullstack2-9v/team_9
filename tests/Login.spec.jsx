// tests/Login.spec.jsx
import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "./test-utils";
import Login from "../src/pages/Login";

describe("Login page", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Evitar navegación real en tests: sobreescribimos location con un objeto simple
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { href: "http://localhost/" },
    });
  });

  afterEach(() => {
    // Restaurar location original después de cada test
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
  });

  it("renderiza marca, título e inputs", () => {
    renderWithRouter(<Login />);
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /pastelería mil sabores/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
    // link a registro
    expect(screen.getByRole("link", { name: /regístrate ahora/i })).toHaveAttribute(
      "href",
      "/registro"
    );
  });

  it("muestra error si correo está vacío", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(screen.getByText(/ingresa tu correo\./i)).toBeInTheDocument();
  });

  it("muestra error si contraseña está vacía", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    await user.type(screen.getByLabelText(/correo/i), "algo@correo.com");
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(screen.getByText(/ingresa tu contraseña\./i)).toBeInTheDocument();
  });

  it("muestra error con credenciales inválidas", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    await user.type(screen.getByLabelText(/correo/i), "x@y.com");
    await user.type(screen.getByLabelText(/contraseña/i), "wrong");
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(screen.getByText(/correo o contraseña incorrectos\./i)).toBeInTheDocument();
    // no debe redirigir
    expect(window.location.href).not.toBe("/admin");
  });

  it("con credenciales válidas muestra 'Sesión iniciada' y redirige a /admin", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    await user.type(screen.getByLabelText(/correo/i), "rparra@duoc.cl");
    await user.type(screen.getByLabelText(/contraseña/i), "123456");
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    // mensaje de éxito
    expect(screen.getByText(/sesión iniciada/i)).toBeInTheDocument();
    // se setea la redirección
    expect(window.location.href).toBe("/admin");
  });
});
