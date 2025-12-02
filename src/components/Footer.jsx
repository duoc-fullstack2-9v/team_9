import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-izq">
        <strong>Pasteleria Mil Sabores</strong>
        <div className="pagos">
          <img src="src/assets/images/Visa_Logo.png" alt="Visa" />
          <img src="src/assets/images/Visa_Logo.png" alt="Mastercard" />
          <img src="src/assets/images/Visa_Logo.png" alt="WebPay" />
        </div>
      </div>
      <form className="noticias" onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="noticias-email" className="noticias-label">
          Inscribete para obtener descuentos e informacion sobre noticias!
        </label>
        <div className="noticias-row">
          <input id="noticias-email" type="email" placeholder="Ingresa tu Email" required />
          <button type="submit">Suscribirse</button>
        </div>
      </form>
    </footer>
  );
}

export default Footer;