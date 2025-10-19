import React, { useState } from "react";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [correo2, setCorreo2] = useState("");
  const [clave, setClave] = useState("");
  const [clave2, setClave2] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [error, setError] = useState("");

  const regiones = {
    "Región Metropolitana de Santiago": ["Santiago", "Ñuñoa", "Puente Alto"],
    "Región de la Araucanía": ["Temuco", "Padre Las Casas", "Villarrica"],
    "Región de Ñuble": ["Chillán", "San Carlos", "Quirihue"]
  };

  function handleRegionalChange(e) {
    setRegion(e.target.value);
    setComuna(""); // reiniciar comuna cuando cambia la región
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

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

    // Simulación de registro
    setError("Registro enviado. ¡Gracias!");
    setNombre(""); setCorreo(""); setCorreo2("");
    setClave(""); setClave2("");
    setRegion("");
    setComuna("");
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

        <button type="submit" className="btn-registrar">Registrarse</button>
        <small className={`estado ${error ? "" : "oculto"}`}>{error}</small>
      </form>
    </main>
  );
}
