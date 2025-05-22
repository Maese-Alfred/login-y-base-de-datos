import { useState, useEffect, FormEvent } from "react";
import api from "../../services/axios";
import "./editarReserva.css";

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
type EditarReservaProps = {
    reserva: Reserva;
    setReserva: React.Dispatch<React.SetStateAction<Reserva | null>>;
    setReservas: React.Dispatch<React.SetStateAction<Reserva[]>>;
    onCancel: () => void;
};

function EditarReserva({
    reserva,
    setReserva,
    setReservas,
    onCancel,
}: EditarReservaProps) {
    // Es buena práctica darle un tipo explícito a useState para formData
    const [formData, setFormData] = useState<Reserva>(reserva);

    useEffect(() => {
        setFormData(reserva);
    }, [reserva]);

    // *** CAMBIO CLAVE AQUÍ: Aceptar HTMLInputElement o HTMLSelectElement ***
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target; // Extraemos el tipo de input
        setFormData((prevData) => ({
            ...prevData,
            // Convertimos a número si el input es de tipo "number"
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const confirmSave = window.confirm("¿Estás seguro de que quieres guardar los cambios?");
        if (!confirmSave) return;

        try {
            await api.put(`/bookings/${formData.id}`, formData);
            setReservas((prev) =>
                prev.map((r) => (r.id === formData.id ? formData : r))
            );
            setReserva(null); // Cierra el modal/limpia la reserva seleccionada
            alert("Reserva actualizada exitosamente!"); // Mensaje de éxito
        } catch (error) {
            console.error("Error editando reserva:", error);
            alert("Hubo un error al actualizar la reserva. Por favor, intenta de nuevo."); // Mensaje de error al usuario
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-button" onClick={onCancel}>
                    &times; {/* Carácter de "times" para la X */}
                </button>
                <h2 className="modal-title">Editar Reserva</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="clienteid">ID Cliente:</label>
                        <input
                            id="clienteid"
                            name="clienteid"
                            type="number"
                            value={formData.clienteid}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zonaCampoTiroID">ID Zona:</label>
                        <input
                            id="zonaCampoTiroID"
                            name="zonaCampoTiroID"
                            type="number"
                            value={formData.zonaCampoTiroID}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <input
                            id="fecha"
                            name="fecha"
                            type="date"
                            value={formData.fecha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hora">Hora:</label>
                        <input
                            id="hora"
                            name="hora"
                            type="time"
                            value={formData.hora}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estadoReserva">Estado:</label>
                        <select
                            id="estadoReserva"
                            name="estadoReserva"
                            value={formData.estadoReserva}
                            onChange={handleChange} // <-- ¡Ahora esta línea es válida!
                            required
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Confirmada">Confirmada</option>
                            <option value="Cancelada">Cancelada</option>
                            {/* Asegúrate de que estos valores coincidan con los de tu backend */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="montoPagado">Monto Pagado:</label>
                        <input
                            id="montoPagado"
                            name="montoPagado"
                            type="number"
                            value={formData.montoPagado}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="modal-button primary">
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="modal-button secondary"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarReserva;