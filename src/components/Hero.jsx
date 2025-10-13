function Hero() {
  return (
    <section className="hero">
      <div className="hero-info">
        <h1>Pastelería Mil Sabores:</h1>
        <p>
          Ofrece una experiencia dulce y memorable a nuestros clientes, 
          proporcionando tortas y productos de repostería de alta calidad...
        </p>

        <a href="/productos" className="hero-boton">Ver todos los productos</a>
        <a href="/login" className="hero-boton">Iniciar sesión</a>
        <a href="/registro" className="hero-boton">Registrarse</a>
      </div>
      <div className="hero-media">
        <img src="/assets/images/pastel_hero.png" alt="pastel" />
      </div>
    </section>
  );
}

export default Hero;