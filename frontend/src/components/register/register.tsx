import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios"; 
import app from "../../firebase/firebaseConfig"; 
import "./register.css"; 

function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!nombre || !correo || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // 1. Crear el usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      const { uid } = userCredential.user;
      console.log("Nombre a enviar:", nombre);
      console.log("Correo a enviar:", correo);


      const response = await api.post("/users", { 
        uid_firebase: uid,
        nombre: nombre,
        correo: correo,
      });

      console.log("Registro exitoso en Firebase y API:", response.data);
      setSuccessMessage("Registro exitoso. ¡Ahora puedes iniciar sesión!");
      // Redirigir al usuario a la página de inicio de sesión
      navigate("/login");

    } catch (firebaseError) {
      console.error("Error al registrar en Firebase:", firebaseError);
      setError("Error al crear la cuenta. Por favor, intenta de nuevo.");
      if (
        typeof firebaseError === "object" &&
        firebaseError !== null &&
        "code" in firebaseError
      ) {
        const errorCode = (firebaseError as { code: string }).code;
        if (errorCode === "auth/email-already-in-use") {
          setError("Este correo electrónico ya está en uso.");
        } else if (errorCode === "auth/weak-password") {
          setError("La contraseña debe tener al menos 6 caracteres.");
        } else {
          setError("Error al crear la cuenta. Por favor, intenta de nuevo.");
        }
      } else {
        setError("Error al crear la cuenta. Por favor, intenta de nuevo.");
      }

    }
  };

  return (
    <form className="register-container" onSubmit={handleRegister}>
      <h1 className="register-title">REGISTRAR</h1>

      <input
        type="text"
        id="nombre"
        name="nombre"
        className="register-input-field"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

     <input
  type="email"
  id="correo"
  name="correo"
  className="register-input-field"
  placeholder="Correo"
  value={correo}
  onChange={(e) => setCorreo(e.target.value)}
  required
/>

      <input
        type="password"
        id="password"
        name="password"
        className="register-input-field"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button type="submit" className="register-button">
        Registrar
      </button>
    </form>
  );
}

export default Register;