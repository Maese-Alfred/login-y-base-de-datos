import { useState, useEffect } from "react";
import api from "../../services/axios";
import "./infoZona.css"; // Asegúrate de tener estilos para el modal

type InfoZonaCompleta = {
  zona_id: number;
  zona_nombre: string;
  zona_descripcion: string;
  capacidad: number;
  fechadesde: string;
  fechahasta: string;
  disponibilidad_fecha: string;
  horainicio: string;
  horafin: string;
  disponible: boolean;
  montopagado: number | null;
};

type InfoZonaModalProps = {
  initialZona: { id: number; nombre: string; descripcion: string };
  onClose: () => void;
};

function InfoZona({ initialZona, onClose }: InfoZonaModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("2025-05-15");
  const [currentInfoZona, setCurrentInfoZona] =
    useState<InfoZonaCompleta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null); // Mensaje de éxito/error al actualizar
  useEffect(() => {
    const fetchFullZonaInfo = async () => {
      setLoading(true);
      setError(null);
      setUpdateMessage(null); // Limpiar mensajes de actualización previos

      try {
        // Aquí el backend debe devolver los datos completos de una única zona para la fecha y el ID
        // Asegúrate que tu ruta en el backend es `/zones/disponibility/:fecha/:id`
        const response = await api.get(
          `/zones/disponibility/${selectedDate}/${initialZona.id}`
        );

        // Tu modelo devuelve un array de un elemento, por eso accedemos a [0]
        const data: InfoZonaCompleta | undefined = response.data[0];

        if (data) {
          setCurrentInfoZona(data);
        } else {
          setError(
            "No se encontraron detalles para esta zona en la fecha seleccionada."
          );
          setCurrentInfoZona(null); // Asegúrate de que no haya datos incompletos
        }
      } catch (err) {
        console.error("Error al cargar detalles de la zona:", err);
        setError(
          "Error al cargar los detalles de la zona. Por favor, revisa la consola."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFullZonaInfo();
  }, [initialZona.id, selectedDate]); // Depende del ID de la zona y la fecha

  // --- Renderizado del Modal ---
  return (
    // Overlay del modal
    <div className="zone-modal-overlay">
      <div className="zone-modal-content">
        <button className="zone-modal-close-button" onClick={onClose}>
          X
        </button>

        {loading && <p>Cargando detalles de la zona...</p>}
        {error && <p className="error-message">{error}</p>}
        {updateMessage && <p className="update-message">{updateMessage}</p>}

        {currentInfoZona && (
          <div>
            <h2>Información de la Zona: {currentInfoZona.zona_nombre}</h2>

            {/* Selector de fecha dentro del modal para ver disponibilidad de otros días */}
            <div className="zona-date-picker">
              <label htmlFor="zona-date-picker">
                Ver disponibilidad para:{" "}
              </label>
              <input
                type="date"
                id="zona-date-picker"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="zona-details">
               <p>
                Disponibilidad para{" "}
                <b>{currentInfoZona.disponibilidad_fecha.split("T")[0]}</b>:
              </p>
              <p>Descripción: {currentInfoZona.zona_descripcion}</p>
              <p>Capacidad: {currentInfoZona.capacidad}</p>
              <p>Fehcas de disponibilidad:
                <br />Desde {currentInfoZona.fechadesde.split("T")[0]}<br /> Hasta:{" "}
                {currentInfoZona.fechahasta.split("T")[0]}
              </p>
             
              <p>
                Horario: {currentInfoZona.horainicio} -{" "}
                {currentInfoZona.horafin}
              </p>
              <p>
                Estado:{" "}
                <b>
                  {currentInfoZona.disponible ? "Disponible" : "No Disponible"}
                </b>
              </p>
              <p>
                Monto Pagado (si aplica):{" "}
                {currentInfoZona.montopagado !== null
                  ? `$${currentInfoZona.montopagado}`
                  : "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoZona;
