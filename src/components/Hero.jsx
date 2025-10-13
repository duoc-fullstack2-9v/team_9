import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-info">
        <h1>Pastelería Mil Sabores:</h1>
        <p>
          Ofrece una experiencia dulce y memorable a nuestros clientes, 
          proporcionando tortas y productos de repostería de alta calidad...
        </p>
          <Link className="hero-boton" to="/productos">Productos</Link>
          <Link className="hero-boton" to="/login">Iniciar Sesión</Link>
          <Link className="hero-boton" to="/registro">Registrarse</Link>

      </div>
      <div className="hero-foto">
        <img src="src\assets\images\pastel_hero.png" alt="pastel" />
      </div>
    </section>
  );
}

export default Hero;