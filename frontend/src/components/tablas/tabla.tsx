import "./tabla.css";
type Column<T> = {
    header : string;
    accessor : keyof T;
}

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  selectedRow?: T | null;
};

function Tabla<T>({ columns, data, onRowClick,selectedRow }: TableProps<T>) {
    return(
        <table className="table">
            <thead className="table-header">
                <tr className="table-row">
                    {columns.map((column) => (
                        <th key={String(column.accessor)}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="table-body">
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}
                        onClick={() => onRowClick?.(row)}
                        style={{ cursor: onRowClick ? "pointer" : "default" }}
                        className={`table-row ${selectedRow === row ? "selected" : ""}`}
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
    )
}

export default Tabla;