import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  // leer usuario guardado en localStorage de forma segura
  let usuario = null;
  const usuarioStr = localStorage.getItem("usuario");
  if (usuarioStr) {
    try {
      usuario = JSON.parse(usuarioStr);
    } catch (e) {
      console.error("Error parseando usuario desde localStorage", e);
      usuario = null;
    }
  }

  function logout() {
    localStorage.removeItem("usuario");
    // redirigir usando el navegador (sin hooks)
    window.location.href = "/login";
  }

  return (
    <header>
      <nav className="navbar">
        <img src="/logo.png" width="60" alt="Logo" />

        <ul className="nav-links">
          <li><Link className="nav-link" to="/">Inicio</Link></li>
          <li><Link className="nav-link" to="/productos">Productos</Link></li>
          <li><Link className="nav-link" to="/contacto">Contacto</Link></li>
          <li><Link className="nav-link" to="/nosotros">Sobre Nosotros</Link></li>
          <li><Link className="nav-link" to="/blog">Blog</Link></li>

          {/* Si NO está logueado */}
          {!usuario && (
            <>
              <li><Link className="nav-link" to="/login">Iniciar Sesión</Link></li>
              <li><Link className="nav-link" to="/registro">Registrarse</Link></li>
            </>
          )}

          {/* Si SÍ está logueado */}
          {usuario && (
            <>
              <li className="nav-link saludo">Hola, {usuario.nombre}</li>
              <li>
                <button
                  type="button"
                  className="nav-link btn-logout"
                  onClick={logout}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          )}

          {usuario?.rol === "admin" && (
            <li><Link className="nav-link" to="/admin">Panel Admin</Link></li>
          )}

        </ul>

        <Link to="/carrito" className="cart">
          <img src="/carrito.png" width="30" alt="Carrito" />
          <span>Carro (0)</span>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;

