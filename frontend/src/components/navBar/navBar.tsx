import RightNavBar from "./rightNavBar";
import { useLocation } from "react-router-dom";
import "./navBar.css";


function NavBar() {
  const titles: Record<string, string> = {
    "/home": "HOME",
    "/client": "CLIENTES",
    "/zone": "ZONAS",
    "/reservas": "RESERVAS",
    "/inventario": "INVENTARIO",
  };
  const location = useLocation();
  const title = titles[location.pathname] || "PÁGINA";

  return (
    <div className="nav-wrapper">
      <div className="nav-title">{title}</div>
      <RightNavBar />
    </div>
  );
}

export default NavBar