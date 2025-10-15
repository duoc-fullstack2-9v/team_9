import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import Layout from "./components/Layout";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Productos from "./pages/Productos.jsx";


import { HashRouter, Route, Routes } from "react-router-dom";

localStorage.setItem("usuario", "jesus.vargas@tinet.cl");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/productos" element={<Productos />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);

