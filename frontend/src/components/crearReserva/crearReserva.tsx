import { useState, useEffect } from "react";
import api from "../../services/axios";
import "./crearReserva.css";

type Cliente = { id: number; nombre: string; };
type Zona = { id: number; nombre: string; };
type EstadoReserva = { id: number; descripcion: string; };

export type ReservaEnvio = {
  clienteid: number;
  fecha: string;
  hora: string;
  estadoReserva: number;
  montoPagado: number | null; // <-- CAMBIO AQUÍ: Ahora montoPagado puede ser null
  zonaCampoTiroID: number;
};

type CrearReservaProps = {
  reserva: ReservaEnvio;
  setReserva: React.Dispatch<React.SetStateAction<ReservaEnvio | null>>;
  setReservas: React.Dispatch<React.SetStateAction<ReservaEnvio[]>>;
};

function CrearReserva({ reserva, setReserva, setReservas }: CrearReservaProps) {
  const [formData, setFormData] = useState<ReservaEnvio>(reserva);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [estadosReserva, setEstadosReserva] = useState<EstadoReserva[]>([]);

  useEffect(() => {
    setFormData(reserva);
  }, [reserva]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [resClientes, resZonas, resEstados] = await Promise.all([
          api.get("/clients"),
          api.get("/zones"),
          api.get("/bookings/status"),
        ]);
        console.log("resEstados.data:", resEstados.data);
        setClientes(resClientes.data);
        setZonas(resZonas.data);
        setEstadosReserva(resEstados.data);
      } catch (error) {
        console.error("Error cargando datos de clientes, zonas o estados de reserva:", error);
      }
    };
    fetchDatos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | number | null; // <-- CAMBIO AQUÍ: Puede ser string, number o null

    if (name === "clienteid" || name === "zonaCampoTiroID" || name === "estadoReserva") {
      newValue = parseInt(value, 10);
      // Si el valor no es un número válido (por ejemplo, "") se convierte a NaN,
      // y si el campo es requerido, lo ideal es que parseInt de NaN se mantenga para la validación HTML
      // o se maneje explícitamente como null si el campo es opcional.
      if (isNaN(newValue)) {
          // Si el campo ID es requerido y el valor es vacío, puedes dejarlo como 0 o null
          // para que el 'required' de HTML lo detecte, o forzar a un valor predeterminado si es válido.
          newValue = 0; // o null, dependiendo de tu lógica de validación
      }
    } else if (name === "montoPagado") {
      if (value === "") { // <-- ¡NUEVA LÓGICA CLAVE PARA montoPagado!
        newValue = null; // Si el input está vacío, el valor es null en el estado
      } else {
        newValue = parseFloat(value);
        if (isNaN(newValue)) {
          console.warn(`Valor inválido para ${name}: ${value}. Se establecerá como null.`);
          newValue = null; // Si es un número inválido, también lo ponemos a null
        }
      }
    } else {
      newValue = value; // Para fecha, hora, etc.
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos a enviar:", formData);
    const confirmSave = window.confirm("¿Guardar cambios?");
    if (!confirmSave) return;

    try {
      // Si montoPagado puede ser null, asegúrate de que tu backend lo maneje.
      // Si el backend espera siempre un número, podrías convertir null a 0 aquí o antes.
      const dataToSend = {
          ...formData,
          // Si 'montoPagado' es null, envíalo como null al backend.
          // Si tu base de datos no acepta null para montoPagado, necesitarás decidir un valor por defecto (ej. 0)
          // dataToSend.montoPagado = formData.montoPagado !== null ? formData.montoPagado : 0;
      };

      console.log("Creando booking con datos:", dataToSend);

      const response = await api.post("/bookings", dataToSend);

      setReservas((prev) => [...prev, response.data]);
      setReserva(null);
      alert("Reserva registrada exitosamente!");
    } catch (error) {
      console.error("Error registrando reserva:", error);
      alert("Hubo un error al registrar la reserva. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="crearReserva-content">
      <h2 className="crearReserva-title">Crear Reserva</h2>
      <form onSubmit={handleSubmit} className="crearReserva-form">
        <div className="form-group">
          <label htmlFor="clienteid">Cliente:</label>
          <select
            id="clienteid"
            name="clienteid"
            value={formData.clienteid || ''}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            id="fecha"
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hora">Hora:</label>
          <input
            id="hora"
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="estadoReserva">Estado de Reserva:</label>
          <select
            id="estadoReserva"
            name="estadoReserva"
            value={formData.estadoReserva || ''}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un estado</option>
            {estadosReserva.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="zonaCampoTiroID">Zona de Campo de Tiro:</label>
          <select
            id="zonaCampoTiroID"
            name="zonaCampoTiroID"
            value={formData.zonaCampoTiroID || ''}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una zona</option>
            {zonas.map((zona) => (
              <option key={zona.id} value={zona.id}>
                {zona.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="montoPagado">Monto Pagado:</label>
          <input
            id="montoPagado"
            type="number"
            name="montoPagado"
            // CAMBIO AQUÍ: Si el valor es null, mostrar cadena vacía para que el input esté en blanco
            value={formData.montoPagado !== null ? formData.montoPagado : ''}
            onChange={handleChange}
            placeholder="Monto Pagado"
            step="0.01"
            required // Si es requerido, considera que el backend no aceptará null
          />
        </div>

        <button type="submit">Registrar Reserva</button>
      </form>
    </div>
  );
}

export default CrearReserva;