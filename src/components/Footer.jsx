function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <strong>Pasteleria Mil Sabores</strong>
        <div className="payments">
          <img src="/assets/images/Visa_Logo.png" alt="Visa" />
          <img src="/assets/images/mastercard.png" alt="Mastercard" />
          <img src="/assets/images/webpay.png" alt="WebPay" />
        </div>
      </div>
      <nav className="footer-links" aria-label="Categorías">
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
      </nav>
      <form className="newsletter" onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="news-email" className="newsletter-label">
          Inscribete para obtener descuentos e informacion sobre noticias!
        </label>
        <div className="newsletter-row">
          <input id="news-email" type="email" placeholder="Ingresa tu Email" required />
          <button type="submit">Suscribirse</button>
        </div>
      </form>
    </footer>
  );
}

export default Footer;