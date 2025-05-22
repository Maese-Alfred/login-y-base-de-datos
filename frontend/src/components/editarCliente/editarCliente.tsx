import { useState, useEffect } from "react";
import api from "../../services/axios";
import "./editarCliente.css";

type Cliente = {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
};

type EditarClienteProps = {
  cliente: Cliente;
  setCliente: React.Dispatch<React.SetStateAction<Cliente | null>>;
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
  onCancel: () => void;
};

function EditarCliente({
  cliente,
  setCliente,
  setClientes,
  onCancel,
}: EditarClienteProps) {
  const [formData, setFormData] = useState(cliente);

  useEffect(() => {
    setFormData(cliente);
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = window.confirm("¿Guardar cambios?");
    if (!confirm) return;

    try {
      await api.put(`/clients/${formData.id}`, formData);
      setClientes((prev) =>
        prev.map((c) => (c.id === formData.id ? formData : c))
      );
      setCliente(null);
    } catch (error) {
      console.error("Error editando cliente:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onCancel}>
          &times; {/* Carácter de "times" para la X */}
        </button>
        <h2 className="modal-title">Editar Cliente</h2>{" "}
        {/* Agrega un título a tu modal */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              id="apellido"
              name="apellido"
              type="text"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              id="telefono"
              name="telefono"
              type="text"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo:</label>
            <input
              id="correo"
              name="correo"
              type="email"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="modal-button primary">
              Guardar
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

export default EditarCliente;
