import { useState, useEffect } from "react";
import api from "../../services/axios";
import "./editarInventario.css";
import {Inventario} from "../../pages/inventario/inventario"

type EditarInventarioProps = {
    inventario: Inventario;
    setInventario: React.Dispatch<React.SetStateAction<Inventario | null>>;
    setInventarios: React.Dispatch<React.SetStateAction<Inventario[]>>;
    onCancel: () => void;
}

function EditarInventario({
    inventario,
    setInventario,
    setInventarios,
    onCancel,
}: EditarInventarioProps) {
    const [formData, setFormData] = useState(inventario);
    const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);

    useEffect(() => {
        setFormData(inventario);
    }, [inventario]);

    useEffect(() => {
        const fetchDatos = async () => {
            try{
                const [resCategorias] = await Promise.all([
                    api.get("/products/categories"),
                ]);
                console.log("resCategorias.data:", resCategorias.data);
                setCategorias(resCategorias.data);
            } catch (error) {
                console.error("Error cargando datos de categorias:", error);
            }
        };
        fetchDatos();
    }, []);
    

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        let newValue: string | number | null;

        if (name === "categoriaId") {
            newValue = parseInt(value);
        } else if (name === "precio" || name === "cantidad") {
            newValue = parseFloat(value);
        } else {
            newValue = value;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const confirm = window.confirm("¿Guardar cambios?");
        if (!confirm) return;

        try {
            console.log("Enviando al backend:", formData);
            await api.put(`/products/${formData.id}`, formData);
            setInventarios((prev) =>
                prev.map((c) => (c.id === formData.id ? formData : c))
            );
            setInventario(null);
        } catch (error) {
            console.error("Error editando inventario:", error);
        }
    };
    return (
        <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onCancel}>
          &times; 
        </button>
        <h2 className="modal-title">Editar Inventario</h2>{" "}
        {/* Agrega un título a tu modal */}
        <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
                <label htmlFor="nombreProducto">Nombre</label>
                <input
                type="text"
                id="nombreProducto"
                name="nombreProducto"
                value={formData.nombreProducto}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="cantidad">Cantidad</label>
                <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="categoriaId">Categoria</label>
                <select
                id="categoriaId"
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
                required
                >
                {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                    </option>
                ))}
                </select>
            </div>
            <button type="submit" className="modal-submit-button">
                Guardar Cambios
            </button>
        </form>
      </div>
    </div>
    );

    };

    export default EditarInventario;