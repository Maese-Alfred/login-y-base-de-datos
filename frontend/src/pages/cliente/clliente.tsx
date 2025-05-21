import NavBar from "../../components/navBar/navBar";
import Tabla from "../../components/tablas/tabla";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import ButtonBar from "../../components/botones/buttonBar";
import EditarCliente from "../../components/editarCliente/editarCliente";

type Cliente = {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
};

const columnas: { header: string; accessor: keyof Cliente }[] = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Apellido", accessor: "apellido" },
    { header: "Teléfono", accessor: "telefono" },
    { header: "Correo", accessor: "correo" },
];

function ClientePage() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
    const [clienteEnEdicion, setClienteEnEdicion] = useState<Cliente | null>(null);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await api.get("/clients");
                console.log("Respuesta completa de axios:", response);
                setClientes(response.data);
            } catch (error) {
                console.error("Error fetching clientes:", error);
            }
        };

        fetchClientes();
    }, []);

    const editarCliente = (cliente: Cliente) => {
        setClienteEnEdicion(cliente);
    };

    const eliminarCliente = async (id: number) => {
        const confirm = window.confirm("¿Estás seguro de eliminar este cliente?");
        if (!confirm) return;

        try {
            await api.delete(`/clients/${id}`);
            setClientes(clientes.filter(c => c.id !== id));
            setClienteSeleccionado(null);
        } catch (error) {
            console.error("Error eliminando cliente:", error);
        }
    };

    return (
        <div className="home">
            <NavBar />
            <h1>Bienvenido a la página de Clientes</h1>
            <p>Esta es la página de clientes de la aplicación.</p>

            <Tabla<Cliente>
                columns={columnas}
                data={clientes}
                onRowClick={(cliente) => setClienteSeleccionado(cliente)}
                selectedRow={clienteSeleccionado}
            />

            {clienteSeleccionado && (
                <ButtonBar
                    onEdit={() => editarCliente(clienteSeleccionado)}
                    onDelete={() => eliminarCliente(clienteSeleccionado.id)}
                />
            )}

            {clienteEnEdicion && (
    <EditarCliente
        cliente={clienteEnEdicion}
        setCliente={setClienteEnEdicion}
        setClientes={setClientes}
        onCancel={() => setClienteEnEdicion(null)}
    />
)}
        </div>
    );
}

export default ClientePage;