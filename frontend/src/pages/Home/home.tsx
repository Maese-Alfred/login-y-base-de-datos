import React from "react";
import NavBar from "../../components/navBar/navBar";
import Tabla from "../../components/tablas/tabla";


//codigo de ejemplo para la tabla
//luego sera cambaiado por la api
// import { useEffect, useState } from "react";
type Usuario = {
  id: number;
  nombre: string;
  correo: string;
};

const usuarios: Usuario[] = [
  { id: 1, nombre: 'Ana López', correo: 'ana@correo.com' },
  { id: 2, nombre: 'Carlos Ruiz', correo: 'carlos@correo.com' },
];

const columnas: { header: string; accessor: keyof Usuario }[] = [
  { header: 'ID', accessor: 'id' },
  { header: 'Nombre', accessor: 'nombre' },
  { header: 'Correo', accessor: 'correo' },
];


function Home() {
    return (
        <div className="home">
            <NavBar />
            <h1>Bienvenido a la página de inicio</h1>
            <p>Esta es la página principal de la aplicación.</p>
            <Tabla<Usuario> columns={columnas} data={usuarios} />
        </div>
        
    );
}

export default Home;