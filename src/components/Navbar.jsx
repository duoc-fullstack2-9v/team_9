import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // leer usuario guardado en localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  function logout() {
    localStorage.removeItem("usuario");
    navigate("/login");
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

          {/* Si SI está logueado */}
          {usuario && (
            <>
              <li className="nav-link saludo">Hola, {usuario.nombre}</li>
              <li>
                <button className="nav-link btn-logout" onClick={logout}>
                  Cerrar sesión
                </button>
              </li>
            </>
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
