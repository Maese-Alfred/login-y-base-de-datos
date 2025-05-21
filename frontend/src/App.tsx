import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/Home/home";
import ClientePage from "./pages/cliente/clliente";

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/client" element={<ClientePage />} />
    </Routes>
  );
}

export default App;