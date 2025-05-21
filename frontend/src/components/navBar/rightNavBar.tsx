import { useNavigate } from "react-router-dom";
import "./rightNavBar.css"

function RightNavBar() {


    const navigate = useNavigate();
    
    const handleClick = (path: string) => {
        navigate(path);
    };
    
    return (
        <div className="navBar">
        <div className="navBar__buttons">
        <button className="navBar__button" onClick={() => handleClick("/home")}>Home</button>
        <button className="navBar__button" onClick={() => handleClick("/client")}>Clientes</button>
        <button className="navBar__button" onClick={() => handleClick("/zone")}>Zonas</button>
        <button className="navBar__button" onClick={() => handleClick("/booking")}>Reservas</button>
        <button className="navBar__button" onClick={() => handleClick("/inventory")}>Inventario</button>
        </div>
        </div>
    );
}

export default RightNavBar;