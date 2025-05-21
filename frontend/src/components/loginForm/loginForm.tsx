import { useState } from "react";
import { loginWithFirebase } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import "./loginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(""); // Estado para manejar errores

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previene la recarga de la página al enviar el formulario

    if (username && password) {
      try {
        const { token, uid } = await loginWithFirebase(username, password);
        console.log("Logged in:", token, uid);
        navigate("/home");
      } catch (error) {
        console.error("Login error:", error);
        setError(
          "Error al iniciar sesión. Por favor, verifica tus credenciales."
        ); // Muestra un mensaje de error al usuario
      }
    } else {
      setError("Por favor, ingresa tu correo electrónico y contraseña."); // Muestra un mensaje si faltan campos
    }
  };

  return (
    <form className="login-container" onSubmit={handleLogin}>
      <h1 className="login-title">INICIO</h1>

      <input
        type="email"
        id="email"
        name="email"
        className="login-input-field"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        id="password"
        name="password"
        className="login-input-field"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="login-button">
        Ingresar
      </button>
    </form>
  );
}

export default LoginForm;
