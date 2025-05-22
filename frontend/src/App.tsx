import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/Home/home";
import ClientePage from "./pages/cliente/clliente";
import Zona from  "./pages/zonas/zona";
import Reservas from "./pages/reservas/reservas";
import Inventario from "./pages/inventario/inventario";

import './App.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/client" element={<ClientePage />} />
      <Route path="/zone" element={<Zona />} />
      <Route path="/reservas" element={<Reservas />} />
      <Route path="/inventario" element={<Inventario />} />
    </Routes>
  );
}

export default App;