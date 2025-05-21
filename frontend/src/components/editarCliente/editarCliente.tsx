import { useState, useEffect } from "react";
import api from "../../services/axios";

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

function EditarCliente({ cliente, setCliente, setClientes, onCancel }: EditarClienteProps) {
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
            setClientes(prev =>
                prev.map(c => (c.id === formData.id ? formData : c))
            );
            setCliente(null);
        } catch (error) {
            console.error("Error editando cliente:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
            />
            <input
                name="apellido"
                type="text"
                value={formData.apellido}
                onChange={handleChange}
            />
            <input
                name="telefono"
                type="text"
                value={formData.telefono}
                onChange={handleChange}
            />
            <input
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
            />
            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
}

export default EditarCliente;