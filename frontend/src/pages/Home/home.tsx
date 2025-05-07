import React from "react";
import NavBar from "../../components/navBar/navBar";

function Home() {
    return (
        <div className="home">
            <NavBar />
            <h1>Bienvenido a la página de inicio</h1>
            <p>Esta es la página principal de la aplicación.</p>
        </div>
    );
}

export default Home;