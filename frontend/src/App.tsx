import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register"; // <- importa tu componente de registro
import './App.css'; // <- importa tu css global

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  );
}

export default App;