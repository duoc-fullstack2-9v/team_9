function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <img src="/assets/images/logo.png" width="60" alt="Logo" />
        <ul className="nav-links">
          <li><a className="nav-link" href="/">Inicio</a></li>
          <li><a className="nav-link" href="/productos">Productos</a></li>
          <li><a className="nav-link" href="/login">Iniciar Sesión</a></li>
          <li><a className="nav-link" href="/contacto">Contacto</a></li>
          <li><a className="nav-link" href="/nosotros">Sobre Nosotros</a></li>
          <li><a className="nav-link" href="/blog">Blog</a></li>
        </ul>
        <a href="/carrito" className="cart">
          <img src="/assets/images/carrito.png" width="30" alt="Carrito" />
          <span>Carro (0)</span>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;