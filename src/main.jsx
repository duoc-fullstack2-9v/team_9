import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Producto from './pages/Producto.jsx'

localStorage.setItem('usuario', 'jesus.vargas@tinet.cl');

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<Producto />} />
      </Routes>
    </HashRouter>

  </StrictMode>
)
