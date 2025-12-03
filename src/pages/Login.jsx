import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://54.80.154.229:8080/api/usuarios/login";
// o la URL de tu server público cuando lo uses

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

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
        contrasena: clave,
      };

      const resp = await axios.post(API_URL, payload);

      // guardar sesión
      localStorage.setItem("usuario", JSON.stringify(resp.data));

      if (resp.data.rol === "admin") {
    navigate("/admin");
  } else {
    navigate("/productos");
  }

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

