import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Para desarrollo local:
const API_URL = "http://54.80.154.229:8080/api/usuarios/login";
// Cuando lo tengas en el servidor público, cambias a:
// const API_URL = "http://54.80.154.229:8080/api/usuarios/login";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  // Si ya hay sesión guardada, redirigir al admin
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      navigate("/admin");
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validaciones simples
    if (correo.trim() === "") {
      setError("Ingresa tu correo.");
      return;
    }
    if (clave === "") {
      setError("Ingresa tu contraseña.");
      return;
    }

    setCargando(true);
    try {
      const payload = {
        correo: correo,
        contrasena: clave, // OJO: debe coincidir con el backend
      };

      const resp = await axios.post(API_URL, payload);

      // Si llega aquí, el login fue exitoso (200 OK)
      // Guardamos el usuario en localStorage para mantener sesión
      localStorage.setItem("usuario", JSON.stringify(resp.data));

      // Limpia error y redirige
      setError("");
      navigate("/admin");
    } catch (err) {
      console.error(err);

      if (err.response && err.response.status === 401) {
        setError("Correo o contraseña incorrectos.");
      } else {
        setError("No se pudo conectar con el servidor.");
      }
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="container login-page">
      <div className="login-brand">
        <img src="/logo.png" alt="Logo" />
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
            <button type="submit" className="btn-login" disabled={cargando}>
              {cargando ? "Ingresando..." : "Iniciar sesión"}
            </button>
            <Link className="btn-registrar" to="/registro">Registrarse</Link>
          </div>

          <small
            id="login-estado"
            className={`estado ${error ? "" : "oculto"}`}
          >
            {error}
          </small>
        </form>
      </section>
    </main>
  );
}
