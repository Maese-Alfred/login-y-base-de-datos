import NavBar from "../../components/navBar/navBar";
import ZonaCard from "../../components/zonaCard/zonaCard";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import "./zona.css";
import InfoZona from "../../components/infoZona/infoZona"; 
import CrearZona from "../../components/crearZona/crearZona";

type Zona = {
  id: number;
  nombre: string;
  descripcion: string;
};


function Zona() {
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [zonaParaModal, setZonaParaModal] = useState<Zona | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const response = await api.get("/zones"); // Obtén las zonas básicas para las tarjetas
        console.log("Zonas cargadas para ZonaCard:", response.data);
        setZonas(response.data);
      } catch (error) {
        console.error("Error fetching zonas:", error);
      }
    };

    fetchZonas();
  }, []);

  // Esta función se llama cuando se hace clic en una ZonaCard
  const handleZonaCardClick = (zona: Zona) => {
    // Al hacer clic, establecemos la zona para el modal y abrimos el modal
    setZonaParaModal(zona);
    setIsModalOpen(true);
    console.log("Zona seleccionada para el modal:", zona);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setZonaParaModal(null); // Limpiar la zona seleccionada
    setIsModalOpen(false); // Cerrar el modal
  };



  return (
    <div className="home">
      <NavBar />
      <div className="zona-container">
        {/* Pasamos la función de clic a ZonaCard */}
        <ZonaCard
          data={zonas}
          onClick={handleZonaCardClick}
          // Quitamos zonaSeleccionada y zonaEnEdicion de aquí si no se usan para estilos internos
          // o si el estado de selección es más complejo dentro de ZonaCard
          zonaSeleccionada={null} // No necesitamos que ZonaCard gestione la selección ahora
          zonaEnEdicion={null}
        />
      </div>
      <CrearZona  
                setZonas={setZonas}/>
      {/* Renderizamos InfoZona como un modal CONDICIONALMENTE */}
      {isModalOpen && zonaParaModal && (
        <InfoZona
          initialZona={zonaParaModal} // Pasamos la zona seleccionada para el modal
          onClose={handleCloseModal} // Pasamos la función para cerrar el modal
        />
      )}

    </div>
  );
}

export default Zona;