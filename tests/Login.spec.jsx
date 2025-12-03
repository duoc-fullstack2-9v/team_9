// tests/Login.spec.jsx
import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "./test-utils";
import Login from "../src/pages/Login";
import axios from "axios";

vi.mock("axios");

// mock de useNavigate para verificar redirecciones
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza marca, título e inputs", () => {
    renderWithRouter(<Login />);
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /pastelería mil sabores/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
    // link a registro
    expect(
      screen.getByRole("link", { name: /registrarse/i })
    ).toHaveAttribute("href", "/registro");
  });

  it("muestra error si correo está vacío", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    await user.click(
      screen.getByRole("button", { name: /iniciar sesión/i })
    );

    expect(
      await screen.findByText(/ingresa tu correo\./i)
    ).toBeInTheDocument();
  });

  it("muestra error si contraseña está vacía", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    await user.type(
      screen.getByLabelText(/correo/i),
      "algo@correo.com"
    );
    await user.click(
      screen.getByRole("button", { name: /iniciar sesión/i })
    );

    expect(
      await screen.findByText(/ingresa tu contraseña\./i)
    ).toBeInTheDocument();
  });

  it("muestra error con credenciales inválidas", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    // simulamos que la API responde 401
    axios.post.mockRejectedValueOnce({
      response: { status: 401 },
    });

    await user.type(
      screen.getByLabelText(/correo/i),
      "x@y.com"
    );
    await user.type(
      screen.getByLabelText(/contraseña/i),
      "wrong"
    );
    await user.click(
      screen.getByRole("button", { name: /iniciar sesión/i })
    );

    expect(
      await screen.findByText(/correo o contraseña incorrectos\./i)
    ).toBeInTheDocument();
    // no debe redirigir
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("con credenciales válidas redirige a /admin", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    // simulamos respuesta exitosa de la API con rol admin
    axios.post.mockResolvedValueOnce({
      data: {
        id: 4,
        nombre: "Robert Parra",
        correo: "rparra@duoc.cl",
        rol: "admin",
      },
    });

    await user.type(
      screen.getByLabelText(/correo/i),
      "rparra@duoc.cl"
    );
    await user.type(
      screen.getByLabelText(/contraseña/i),
      "1234"
    );
    await user.click(
      screen.getByRole("button", { name: /iniciar sesión/i })
    );

    // esperamos a que se haga la navegación
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });

    // opcional: asegurarse de que NO haya mensaje de error
    expect(
      screen.queryByText(/correo o contraseña incorrectos\./i)
    ).not.toBeInTheDocument();
  });
});
