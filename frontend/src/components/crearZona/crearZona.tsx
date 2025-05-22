import { useState } from "react";
import api from "../../services/axios";
import "./crearZona.css";

type Zona = {
    id: number;
    nombre: string;
    descripcion: string;
}

type CrearZonaProps = {
    setZonas: React.Dispatch<React.SetStateAction<Zona[]>>;
}

function CrearZona({ setZonas }: CrearZonaProps) { // Recibe solo setZonas
    // Inicializa formData directamente para una nueva zona
    const [formData, setFormData] = useState<Zona>({ id: 0, nombre: "", descripcion: "" });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Añade HTMLTextAreaElement
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null); // Limpiar mensajes previos
        setErrorMessage(null);

        const confirmSave = window.confirm("¿Guardar cambios?");
        if (!confirmSave) return;

        try {
            // El ID de la zona probablemente se genera en el backend
            const response = await api.post("/zones", {
                nombre: formData.nombre,
                descripcion: formData.descripcion
            });
            
            // Asume que el backend devuelve la zona creada con su ID
            const newZona: Zona = response.data; 

            setZonas((prev) => [...prev, newZona]); // Añade la nueva zona a la lista
            setFormData({ id: 0, nombre: "", descripcion: "" }); // Resetear el formulario
            setSuccessMessage("Zona registrada exitosamente!");

        } catch (error) {
            console.error("Error registrando zona:", error);
            setErrorMessage("Error registrando zona. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div className="crearZona-content">
            <h2 className="crearZona-title">Registrar Zona</h2>
            
            <form onSubmit={handleSubmit} className="crearZona-form">
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                />
                <textarea // Cambié a textarea si la descripción puede ser larga
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción"
                    required
                />
                <button type="submit" className="crearZona-button">Registrar</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default CrearZona;