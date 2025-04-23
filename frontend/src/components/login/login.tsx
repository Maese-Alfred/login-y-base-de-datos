import React, { useState } from 'react';
import { loginWithFirebase } from '../../firebase/auth'; // Importa la función correcta
import { useNavigate } from "react-router-dom";
import './login.css'; // Asegúrate de tener el CSS correspondiente


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (username && password) {
            try {
                // Aquí se llama a la función loginWithFirebase
                const { token, uid } = await loginWithFirebase(username, password);
                console.log('Logged in:', token, uid);
                // Realiza lo que necesites con el token, por ejemplo, guardarlo en localStorage
                navigate('/home'); // Redirige al usuario a la página de inicio
            } catch (error) {
                console.error('Login error:', error);
            }
        } else {
            alert('Please enter both username and password');
        }
    };

    return (
        <div className='container'>   
        <div className='login__container'>   
            <h2>Login</h2>
            <div className='login__input--container'>
                <input
                    className='login__input' 
                    type="text" 
                    placeholder='Username' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    className='login__input'
                    type="password" 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button
                    className='login__button'
                    type="button" 
                    disabled={!username || !password} // Deshabilita el botón si no hay username o password
                    onClick={handleLogin}
                >Login</button>
            </div>
            <div className='login__info--container'>
                <p>Don't have an account? <span className='register' onClick={() => navigate('/register')}>Register</span></p>
            </div>
        </div>
        </div>
    );  
}

export default Login;