import { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firebase/firebaseConfig";
import './register.css'; // Asegúrate de tener el CSS correspondiente

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth(app);

    try {
      // 1. Registrar en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const token = await userCredential.user.getIdToken();

      // 2. Enviar a tu backend con el token y los datos que espera
      await axios.post("http://localhost:3000/api/users/register", {
        uid_firebase: uid,
        usuario: username,
        rol: "user", // Puedes cambiarlo o usar un select si quieres
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Usuario registrado correctamente");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Error en el registro");
    }
  };

  return (
    <div className="container">
    <div className="register__container">
      <h2>Registro</h2>
    <form onSubmit={handleSubmit} className="register__form">
      <input 
        className="register__input"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        className="register__input"
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        className="register__input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register__button" type="submit">Registrarse</button>
      <button className="exit__button"> Salir </button>
    </form>
    </div>
    </div>
  );
};

export default Register;
