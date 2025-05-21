import LoginForm from '../../components/loginForm/loginForm';
import Register from '../../components/register/register';
import './login.css'; // Asegúrate de tener el CSS correspondiente


function Login() {
   return( 
   <div className='container'>
   <LoginForm />
    <Register />
    </div>
   );
}

export default Login;