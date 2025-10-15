import React, { useState } from "react";

export default function Login() {
  // Estados locales para mantener los valores del formulario
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");  // mensaje de error a mostrar

  // Función que se ejecuta al enviar el formulario
  function handleSubmit(e) {
    e.preventDefault();           // evitar recarga de página
    setError("");                  // limpiar mensaje previo

    // Validaciones simples
    if (correo.trim() === "") {
      setError("Ingresa tu correo.");
      return;
    }
    if (clave === "") {
      setError("Ingresa tu contraseña.");
      return;
    }

    // Validación demo: credenciales de prueba
    const testEmail = "rparra@duoc.cl";
    const testPass = "123456";

    if (correo === testEmail && clave === testPass) {
      setError("Sesión iniciada");
      // redirigir al admin (puedes usar react-router o window.location)
      window.location.href = "/admin";
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  }

  return (
    <main className="container login-page">
      <div className="login-brand">
        <img src="src\assets\images\logo.png" alt="Logo" />
        <h1 className="brand-name">Pastelería Mil Sabores</h1>
      </div>

      <section className="login">
        <div className="login-header">Inicio de sesión</div>
        <form id="form-login" onSubmit={handleSubmit} noValidate>
          <label htmlFor="login-email">CORREO</label>
          <input
            id="login-email"
            type="email"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
          />

          <label htmlFor="login-pass">CONTRASEÑA</label>
          <input
            id="login-pass"
            type="password"
            value={clave}
            onChange={e => setClave(e.target.value)}
            required
          />

          <div className="inicio-sesion-registro">
            <button type="submit" className="btn-login">Iniciar sesión</button>
            <a href="/registro" className="btn-registrar">Regístrate ahora!</a>
          </div>

          <small id="login-estado" className={`estado ${error ? "" : "oculto"}`}>{error}</small>
        </form>
      </section>
    </main>
  );
}