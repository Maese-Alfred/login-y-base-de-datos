import React from "react";
import { useNavigate } from "react-router-dom";


function NavBar() {
    const navigate = useNavigate();
    
    const handleClick = (path: string) => {
        navigate(path);
    };
    
    return (
        <div className="navBar">
        <button className="navBar__button" onClick={() => handleClick("/home")}>Home</button>
        <button className="navBar__button" onClick={() => handleClick("/register-client")}>Registrar Cliente</button>
        <button className="navBar__button" onClick={() => handleClick("/zone")}>Zonas</button>
        <button className="navBar__button" onClick={() => handleClick("/booking")}>Reservas</button>
        <button className="navBar__button" onClick={() => handleClick("/inventory")}>Inventario</button>
        </div>
    );
}

export default NavBar;