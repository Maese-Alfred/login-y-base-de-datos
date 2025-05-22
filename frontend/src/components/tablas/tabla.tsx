import React, { useState } from "react"; // Importa useState
import "./tabla.css";

// Reutilizamos tus tipos
type Column<T> = {
  header: string;
  accessor: keyof T;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  selectedRow?: T | null;
};

function Tabla<T>({ columns, data, onRowClick, selectedRow }: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const itemsPerPage = 7; // Máximo 7 elementos por página

  // Calcula el índice de inicio y fin para los elementos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Genera los números de las páginas
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="table-container"> 
      <table className="table">
        <thead className="table-header">
          <tr className="table-row">
            {columns.map((column) => (
              <th key={String(column.accessor)}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {currentItems.map((row, rowIndex) => (
            <tr
              key={rowIndex} // Usar un ID único si es posible, de lo contrario rowIndex está bien para listas estáticas
              onClick={() => onRowClick?.(row)}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
              className={`table-row ${
                selectedRow === row ? "selected" : ""
              }`}
            >
              {columns.map((column) => (
                <td key={String(column.accessor)}>
                  {String(row[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de Paginación */}
      <div className="pagination">
        {/* Botón "Anterior" */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Anterior
        </button>

        {/* Números de página */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`pagination-button ${currentPage === number ? "active" : ""}`}
          >
            {number}
          </button>
        ))}

        {/* Botón "Siguiente" */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Tabla;