import db from "../config/db.js";

// Crear zona
export const createZone = async ({ nombre, descripcion }) => {
  if (!nombre || !descripcion) {
    throw new Error("El nombre y la descripción son obligatorios.");
  }

  try {
    const result = await db`
      INSERT INTO zonascampotiro (nombre, descripcion)
      VALUES (${nombre}, ${descripcion})
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Error creating zone:", error);
    throw error;
  }
};





export const getZoneDisponibilityWithConfigurationByDate = async (fecha,id) => {
  if (!fecha) {
    throw new Error("La fecha es obligatoria.");
  }

  try {
    const result = await db`
      SELECT 
        z.id AS zona_id,
        z.nombre AS zona_nombre,
        z.descripcion AS zona_descripcion,
        cz.capacidad,
        cz.fechadesde,
        cz.fechahasta,
        dz.fecha AS disponibilidad_fecha,
        dz.horainicio,
        dz.horafin,
        dz.disponible,
        r.montopagado
      FROM zonascampotiro z
      LEFT JOIN configuracionzona cz ON cz.zonaid = z.id
      LEFT JOIN disponibilidadzona dz ON dz.zonaid = z.id AND dz.fecha = ${fecha}
      LEFT JOIN reservas r ON r.zonacampotiroid = z.id AND r.fecha = ${fecha}
      WHERE dz.fecha = ${fecha} 
      AND z.id = ${id}
      ORDER BY z.nombre;
    `;
    return result;
  } catch (error) {
    console.error("Error fetching zones with configuration and availability:", error);
    throw error;
  }
};




export const getZonesWithBooking = async (fecha) => {
  if (!fecha) {
    throw new Error("La fecha es obligatoria.");
  }

  try {
    const result = await db`
      SELECT z.*, r.fecha, r.hora, r.montopagado
      FROM zonascampotiro z
      JOIN reservas r ON z.id = r.zonacampotroid
      WHERE r.fecha = ${fecha};
    `;
    return result;
  } catch (error) {
    console.error("Error fetching zones with booking:", error);
    throw error;
  }
};


export const getAllZones = async () => {
  try {
    const result = await db`
      SELECT * FROM zonascampotiro;
    `;
    return result;
  } catch (error) {
    console.error("Error fetching all zones:", error);
    throw error;
  }
};


export const getZoneById = async (id) => {
  try {
    const result = await db`
      SELECT * FROM zonascampotiro WHERE id = ${id};
    `;
    if (result.length === 0) {
      throw new Error("Zona no encontrada.");
    }
    return result[0];
  } catch (error) {
    console.error("Error fetching zone by ID:", error);
    throw error;
  }
};


export const updateZone = async (id, { nombre, descripcion }) => {
  if (!nombre || !descripcion) {
    throw new Error("El nombre y la descripción son obligatorios.");
  }

  try {
    const result = await db`
      UPDATE zonascampotiro
      SET nombre = ${nombre}, descripcion = ${descripcion}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Error updating zone:", error);
    throw error;
  }
};


export const deleteZone = async (id) => {
  try {
    const result = await db`
      DELETE FROM zonascampotiro WHERE id = ${id}
      RETURNING *;
    `;
    if (result.length === 0) {
      throw new Error("Zona no encontrada para eliminar.");
    }
    return result[0];
  } catch (error) {
    console.error("Error deleting zone:", error);
    throw error;
  }
};

