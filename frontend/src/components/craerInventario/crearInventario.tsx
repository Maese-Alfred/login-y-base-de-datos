import { useState, useEffect } from "react";
import api from "../../services/axios";
import "./crearInventario.css";
import {Inventario} from "../../pages/inventario/inventario"

type CrearInventarioProps = {
    inventario: Inventario;
    setInventario: React.Dispatch<React.SetStateAction<Inventario | null>>;
    setInventarios: React.Dispatch<React.SetStateAction<Inventario[]>>;
}

function CrearInventario({
    inventario,
    setInventario,
    setInventarios,
}: CrearInventarioProps) {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const confirm = window.confirm("¿Guardar cambios?");
        if (!confirm) return;

        try {
            console.log("formData:", formData);
            const res = await api.post("/products", formData);
            console.log("Producto creado:", res.data);
            setInventarios((prev) => [...prev, res.data]);
            setInventario(null);
        } catch (error) {
            console.error("Error creando producto:", error);
        }
    };
    
    return (
        <div className="crearInventario-content">
            <h2 className="crearInventario-title">Añadir producto</h2>
            <form onSubmit={handleSubmit} className="crearInventario-form">
            <div className="crearInventario-form-group">
            <input
                type="text"
                name="nombreProducto"
                value={formData.nombreProducto}
                onChange={handleChange}
                placeholder="Nombre del Producto"
                required
            />
            </div>
             <div className="crearInventario-form-group">
            <label htmlFor="cantidad">Cantidad</label>
            <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                placeholder="Cantidad"
                required
                />
            </div>
            <div className="crearInventario-form-group">
            <label htmlFor="precio">Precio</label>
           <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                placeholder="Precio"
                required
                />
            </div>
              <div className="crearInventario-form-group"> 
             <select
                id="categoriaId"
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                    </option>
                ))}
              </select>
            </div>  

            <button type="submit">Registrar</button>
            </form>
        </div>
    );

}

export default CrearInventario;