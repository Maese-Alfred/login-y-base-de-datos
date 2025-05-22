import NavBar from "../../components/navBar/navBar";
import Tabla from "../../components/tablas/tabla";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import EditarInventario from "../../components/editarInventario/editarInventario";
import ButtonBar from "../../components/botones/buttonBar";
import CrearInventario from "../../components/craerInventario/crearInventario";
import "./inventario.css";


export type Inventario = {
  id: number;
  nombreProducto: string;
  cantidad: number;
  precio: number;
  categoriaId: number;
  categoria?: string;
};

const columnas: { header: string; accessor: keyof Inventario }[] = [
  { header: "Nombre", accessor: "nombreProducto" }, 
  { header: "Cantidad", accessor: "cantidad" },
  { header: "Precio", accessor: "precio" },
  { header: "Categoria", accessor: "categoria" },
];

function Inventario() {
  const [inventario, setInventario] = useState<Inventario[]>([]);
  const [inventarioSeleccionado, setInventarioSeleccionado] = useState<Inventario | null>(null);
  const [inventarioEnEdicion, setInventarioEnEdicion] = useState<Inventario | null>(null);

    useEffect(() => {
    const fetchInventario = async () => {
      try {
         const response = await api.get("/products");
        console.log("Respuesta completa de axios:", response);
        setInventario(response.data);
      } catch (error) {
        console.error("Error fetching inventario:", error);
      }
    }

    fetchInventario();
  }, []);


  const handleRowClick = (inventario: Inventario) => {
    if (inventarioSeleccionado && inventarioSeleccionado.id === inventario.id) {
      setInventarioSeleccionado(null);
    } else {
      setInventarioSeleccionado(inventario);
    }
  };

  const editarInventario = (inventario: Inventario) => {
    setInventarioEnEdicion(inventario);
  };

  const eliminarInventario = async (id: number) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este inventario?");
    if (!confirm) return;
    try {
      await api.delete(`/products/${id}`);
      setInventario(inventario.filter(i => i.id !== id));
      setInventarioSeleccionado(null);
    } catch (error) {
      console.error("Error eliminando inventario:", error);
    }
  }
  return (
    <div className="home">
      <NavBar />
      <div className="inventario-content">

       <CrearInventario 
       inventario={{id: 0, nombreProducto: "", cantidad: 0, precio: 0, categoriaId: 0}}
       setInventario={setInventarioEnEdicion}
       setInventarios={setInventario}/>

      <div className="inventario-table-content">
      <Tabla<Inventario> columns={columnas} data={inventario} onRowClick={handleRowClick} selectedRow={inventarioSeleccionado} />
     
      {inventarioSeleccionado && (
                <ButtonBar
                    onEdit={() => editarInventario(inventarioSeleccionado)}
                    onDelete={() => eliminarInventario(inventarioSeleccionado.id)}
                />
            )}
            </div>
            </div>
      {inventarioEnEdicion && (
      <EditarInventario
        inventario={inventarioEnEdicion}
        setInventario={setInventarioEnEdicion}
        setInventarios={setInventario}
        onCancel={() => setInventarioEnEdicion(null)}
       />
      )}
    
    </div>
  );
}

export default Inventario;

