import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Para desarrollo local:
const API_URL = "http://54.80.154.229:8080/api/usuarios";

export default function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [editando, setEditando] = useState(null); // usuario en edición
  const [nombreEdit, setNombreEdit] = useState("");
  const [correoEdit, setCorreoEdit] = useState("");
  const [contrasenaEdit, setContrasenaEdit] = useState("");
  const [rolEdit, setRolEdit] = useState("");

  const navigate = useNavigate();

  // Proteger ruta: solo admins
  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (!usuarioStr) {
      navigate("/login");
      return;
    }
    try {
      const usuario = JSON.parse(usuarioStr);
      if (usuario.rol !== "admin") {
        navigate("/productos"); // usuario normal -> a productos
      }
    } catch (e) {
      console.error("Error parseando usuario en Admin:", e);
      navigate("/login");
    }
  }, [navigate]);

  // Cargar usuarios
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        setCargando(true);
        const resp = await axios.get(API_URL);
        setUsuarios(resp.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los usuarios.");
      } finally {
        setCargando(false);
      }
    }

    fetchUsuarios();
  }, []);

  function empezarEdicion(usuario) {
    setEditando(usuario);
    setNombreEdit(usuario.nombre);
    setCorreoEdit(usuario.correo);
    setContrasenaEdit(usuario.contrasena); // importante: el backend lo requiere
    setRolEdit(usuario.rol || "usuario");
  }

  function cancelarEdicion() {
    setEditando(null);
    setNombreEdit("");
    setCorreoEdit("");
    setContrasenaEdit("");
    setRolEdit("");
  }

  async function guardarCambios(e) {
    e.preventDefault();
    if (!editando) return;

    try {
      const payload = {
        nombre: nombreEdit,
        correo: correoEdit,
        contrasena: contrasenaEdit,
        rol: rolEdit
      };

      const resp = await axios.put(`${API_URL}/${editando.id}`, payload);

      // Actualizar lista en memoria
      setUsuarios(usuarios.map(u => (u.id === editando.id ? resp.data : u)));
      cancelarEdicion();
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el usuario.");
    }
  }

  async function eliminarUsuario(id) {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmar) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsuarios(usuarios.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      setError("Error al eliminar el usuario.");
    }
  }

  return (
    <main className="container admin-page">
      <h1>Panel de Administración</h1>

      {cargando && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!cargando && usuarios.length === 0 && (
        <p>No hay usuarios registrados.</p>
      )}

      {!cargando && usuarios.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{u.rol}</td>
                <td>
                  <button onClick={() => empezarEdicion(u)}>
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarUsuario(u.id)}
                    style={{ marginLeft: "8px", color: "white", backgroundColor: "red" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Formulario de edición simple */}
      {editando && (
        <section className="admin-edit">
          <h2>Editando usuario ID {editando.id}</h2>
          <form onSubmit={guardarCambios}>
            <div>
              <label>Nombre</label>
              <input
                type="text"
                value={nombreEdit}
                onChange={e => setNombreEdit(e.target.value)}
              />
            </div>

            <div>
              <label>Correo</label>
              <input
                type="email"
                value={correoEdit}
                onChange={e => setCorreoEdit(e.target.value)}
              />
            </div>

            <div>
              <label>Contraseña</label>
              <input
                type="password"
                value={contrasenaEdit}
                onChange={e => setContrasenaEdit(e.target.value)}
              />
            </div>

            <div>
              <label>Rol</label>
              <select
                value={rolEdit}
                onChange={e => setRolEdit(e.target.value)}
              >
                <option value="usuario">Usuario</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={cancelarEdicion} style={{ marginLeft: "8px" }}>
              Cancelar
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
