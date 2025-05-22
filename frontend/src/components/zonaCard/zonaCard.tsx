import "./zonaCard.css";

type Zona = {
  id: number;
  nombre: string;
  descripcion: string;
};

type ZonaCardProps = {
  data: Zona[];
  // Nueva prop para manejar el clic en la tarjeta
  onClick: (zona: Zona) => void;
  // Si zonaSeleccionada / zonaEnEdicion se usaban para estilos en ZonaCard,
  // asegúrate de que el tipo sea compatible o elimínalos si ya no son relevantes aquí.
  zonaSeleccionada?: Zona | null;
  zonaEnEdicion?: Zona | null;
};


function ZonaCard({ data, onClick, zonaSeleccionada, zonaEnEdicion }: ZonaCardProps) {
  return (
    <div className="zona-card">
      {data.map((zona) => (
        <div
          key={zona.id}
          className={`zona-card-item ${zonaSeleccionada?.id === zona.id ? 'selected' : ''} ${zonaEnEdicion?.id === zona.id ? 'editing' : ''}`}
          onClick={() => onClick(zona)} // Llama a la función onClick del padre
        >
          <h2>{zona.nombre}</h2>
          <p>{zona.descripcion}</p>
        </div>
      ))}
    </div>
  );
}

export default ZonaCard;