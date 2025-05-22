import NavBar from "../../components/navBar/navBar";
import Tabla from "../../components/tablas/tabla";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import ButtonBar from "../../components/botones/buttonBar";
import CrearReserva from "../../components/crearReserva/crearReserva";
import EditarReserva from "../../components/editarReserva/editarReserva";
import { ReservaEnvio } from "../../components/crearReserva/crearReserva";
import "./reservas.css";

type Reserva = {
  id: number;
  clienteid: number;
  cliente: string;
  fecha: string;
  hora: string;
  estadoReserva: string;
  zonaCampoTiroID: number;
    zonaCampoTiro: string;
  montoPagado: number;
};

const columnas: { header: string; accessor: keyof Reserva }[] = [
  { header: "ID", accessor: "id" },
  { header: "Cliente", accessor: "cliente" },
  { header: "Fecha", accessor: "fecha" },
  { header: "Hora", accessor: "hora" },
  { header: "Estado Reserva", accessor: "estadoReserva" },
  { header: "Zona Campo Tiro", accessor: "zonaCampoTiro" },
  { header: "Monto Pagado", accessor: "montoPagado" },
];

function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [reservaSeleccionada, setReservaSeleccionada] =
    useState<Reserva | null>(null);
  const [reservaEnEdicion, setReservaEnEdicion] = useState<Reserva | null>(
    null
  );
  const [reservaEnvio, setReservaEnvio] = useState<ReservaEnvio | null>(null);
  const [reservasEnvio, setReservasEnvio] = useState<ReservaEnvio[]>([]);

 useEffect(() => {
  const fetchReservas = async () => {
    try {
      const response = await api.get("/bookings");

      type ApiReserva = {
        id: number;
        cliente: string;
        fecha: string;
        hora: string;
        estado: string;
        zona: string;
        montopagado: string | number;
      };

      const reservasTransformadas: Reserva[] = response.data.map((r: ApiReserva) => ({
        id: r.id,
        clienteid: 0, // si no te llega desde la API, puedes dejarlo en 0 o ajustarlo
        cliente: r.cliente,
        fecha: r.fecha,
        hora: r.hora,
        estadoReserva: r.estado,
        zonaCampoTiroID: 0, // igual, si no te llega este campo
        zonaCampoTiro: r.zona,
        montoPagado: typeof r.montopagado === "string" ? parseFloat(r.montopagado) : r.montopagado,
      }));

      setReservas(reservasTransformadas);
    } catch (error) {
      console.error("Error fetching reservas:", error);
    }
  };

  fetchReservas();
}, []);

  const editarReserva = (reserva: Reserva) => {
    setReservaEnEdicion(reserva);
  };

  const eliminarReserva = async (id: number) => {
    const confirm = window.confirm("¿Estás seguro de eliminar esta reserva?");
    if (!confirm) return;

    try {
      await api.delete(`/bookings/${id}`);
      setReservas(reservas.filter((r) => r.id !== id));
      setReservaSeleccionada(null);
    } catch (error) {
      console.error("Error eliminando reserva:", error);
    }
  };

  const handleRowClick = (reserva: Reserva) => {
    if (reservaSeleccionada && reservaSeleccionada.id === reserva.id) {
      setReservaSeleccionada(null);
    } else {
      setReservaSeleccionada(reserva);
    }
  };

  return (
    <div className="home">
      <NavBar />
      <div className="reserva-content">
         <CrearReserva
                reserva={{clienteid: 0, fecha: "", hora: "", estadoReserva: 0, zonaCampoTiroID: 0, montoPagado: 0 }}
                setReserva={setReservaEnvio}
                setReservas={setReservasEnvio}
                />
    <div className="reserva-table-content">
      <Tabla<Reserva>
        columns={columnas}
        data={reservas}
        onRowClick={handleRowClick}
        selectedRow={reservaSeleccionada}
      />
       <ButtonBar
                    onEdit={() => reservaSeleccionada && editarReserva(reservaSeleccionada)}
                    onDelete={() => reservaSeleccionada && eliminarReserva(reservaSeleccionada.id)}
                />
        </div>
        </div>


        {reservaEnEdicion && (
          <EditarReserva
            reserva={reservaEnEdicion}
            setReserva={setReservaEnEdicion}
            setReservas={setReservas}
            onCancel={() => setReservaEnEdicion(null)}
          />
        )}
    </div>
  );
}

export default Reservas;
