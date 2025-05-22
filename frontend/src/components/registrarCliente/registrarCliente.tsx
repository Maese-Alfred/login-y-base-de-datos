import { useState, useEffect } from "react";
import api from "../../services/axios";
import "./registarCliente.css";

type Cliente = {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
};

type RegistrarClienteProps = {
  cliente: Cliente;
  setCliente: React.Dispatch<React.SetStateAction<Cliente | null>>;
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
};

function RegistrarCliente({
    cliente,
    setCliente,
    setClientes,
    }: RegistrarClienteProps) {
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
        await api.post("/clients", formData);
        setClientes((prev) => [...prev, formData]);
        setCliente(null);
        } catch (error) {
        console.error("Error registrando cliente:", error);
        }
    };
    
    return (
        <div className="registarCliente-content">
            <h2 className="registrarCliente-title">Registrar Cliente</h2>
            <form onSubmit={handleSubmit} className="registrarCliente-form">
            <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
            />
            <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                required
            />
            <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                required
            />
            <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                required
            />
            <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegistrarCliente;
