import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://54.80.154.229:8080/api/usuarios";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [correo2, setCorreo2] = useState("");
  const [clave, setClave] = useState("");
  const [clave2, setClave2] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);

  const regiones = {
    "Región Metropolitana de Santiago": ["Santiago", "Ñuñoa", "Puente Alto"],
    "Región de la Araucanía": ["Temuco", "Padre Las Casas", "Villarrica"],
    "Región de Ñuble": ["Chillán", "San Carlos", "Quirihue"]
  };

  function handleRegionalChange(e) {
    setRegion(e.target.value);
    setComuna(""); // reiniciar comuna cuando cambia la región
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setExito("");

    // Validaciones front
    if (nombre.trim() === "") {
      setError("Ingresa tu nombre.");
      return;
    }
    if (correo.trim() === "" || correo2.trim() === "") {
      setError("Ingresa los correos.");
      return;
    }
    if (correo !== correo2) {
      setError("Los correos no coinciden.");
      return;
    }
    if (clave === "" || clave2 === "") {
      setError("Ingresa las contraseñas.");
      return;
    }
    if (clave !== clave2) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!region) {
      setError("Selecciona tu región.");
      return;
    }
    if (!comuna) {
      setError("Selecciona tu comuna.");
      return;
    }

    // Ahora sí: llamar al backend
    setCargando(true);
    try {
      const payload = {
        nombre: nombre,
        correo: correo,
        contrasena: clave      // OJO: el backend espera "contrasena"
      };

      const respuesta = await axios.post(API_URL, payload);

      console.log("Usuario creado:", respuesta.data);

      setExito("Registro exitoso. ¡Gracias por registrarte!");
      // limpiar formulario
      setNombre("");
      setCorreo("");
      setCorreo2("");
      setClave("");
      setClave2("");
      setRegion("");
      setComuna("");
    } catch (err) {
      console.error(err);

      if (err.response) {
        // El backend respondió con un status != 2xx
        if (err.response.status === 409) {
          setError("Ya existe un usuario con ese correo.");
        } else {
          setError("Error en el registro. Intenta nuevamente.");
        }
      } else {
        // Error de red o no hay respuesta del servidor
        setError("No se pudo conectar con el servidor.");
      }
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="container registro">
      <div className="registro-header">Registro</div>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

        <label>Correo</label>
        <input
          type="email"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
        />

        <label>Repetir correo</label>
        <input
          type="email"
          value={correo2}
          onChange={e => setCorreo2(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={clave}
          onChange={e => setClave(e.target.value)}
        />

        <label>Repetir contraseña</label>
        <input
          type="password"
          value={clave2}
          onChange={e => setClave2(e.target.value)}
        />

        <label>Región</label>
        <select value={region} onChange={handleRegionalChange} required>
          <option value="">-- Elige región --</option>
          {Object.keys(regiones).map((r, i) => (
            <option key={i} value={r}>{r}</option>
          ))}
        </select>

        <label>Comuna</label>
        <select
          value={comuna}
          onChange={e => setComuna(e.target.value)}
          disabled={!regiones[region]}
          required
        >
          <option value="">-- Elige comuna --</option>
          {region && regiones[region].map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        <button type="submit" className="btn-registrar" disabled={cargando}>
          {cargando ? "Registrando..." : "Registrarse"}
        </button>

        {/* Mensajes */}
        {error && <small className="estado error">{error}</small>}
        {exito && <small className="estado exito">{exito}</small>}
      </form>
    </main>
  );
}

