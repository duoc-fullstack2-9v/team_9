import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <img src="src\assets\images\logo.png" width="60" alt="Logo" />

        <ul className="nav-links">
          <li><Link className="nav-link" to="/">Inicio</Link></li>
          <li><Link className="nav-link" to="/productos">Productos</Link></li>
          <li><Link className="nav-link" to="/login">Iniciar Sesión</Link></li>
          <li><Link className="nav-link" to="/registro">Registrarse</Link></li>
          <li><Link className="nav-link" to="/contacto">Contacto</Link></li>
          <li><Link className="nav-link" to="/nosotros">Sobre Nosotros</Link></li>
          <li><Link className="nav-link" to="/blog">Blog</Link></li>
        </ul>

        <Link to="/carrito" className="cart">
          <img src="src\assets\images\carrito.png" width="30" alt="Carrito" />
          <span>Carro (0)</span>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;