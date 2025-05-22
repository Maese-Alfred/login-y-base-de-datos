import db from "../config/db.js";

// Crear una reserva
export const createBooking = async ({ clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado }) => {
  try {
    console.log("Creating booking with data:", { clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado }
        )    
      const result = await db`
      INSERT INTO reservas (clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado)
      VALUES (${clienteid}, ${fecha}, ${hora}, ${estadoreservaid}, ${zonacampotiroid}, ${montopagado})
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// Obtener todas las reservas
export const getAllBookings = async () => {
  try {
    const result = await db`
      SELECT 
        r.id,
        r.fecha,
        r.hora,
        r.montopagado,
        c.nombre AS cliente,
        z.nombre AS zona,
        e.descripcion AS estado
      FROM reservas r
      JOIN clientes c ON r.clienteid = c.id
      JOIN zonascampotiro z ON r.zonacampotiroid = z.id
      JOIN estadosreserva e ON r.estadoreservaid = e.id;
    `;
    return result;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Obtener reservas por cliente
export const getBookingByClientId = async (id) => {
  try {
    const result = await db`
      SELECT r.*, 
             z.nombre AS zona, 
             e.descripcion AS estado
      FROM reservas r
      JOIN zonascampotiro z ON r.zonacampotiroid = z.id
      JOIN estadosreserva e ON r.estadoreservaid = e.id
      WHERE r.clienteid = ${id};
    `;
    return result;
  } catch (error) {
    console.error("Error fetching booking by client ID:", error);
    throw error;
  }
};

export const updateBooking = async (id, { clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado }) => {
  try {
    const result = await db`
      UPDATE reservas
      SET clienteid = ${clienteid},
          fecha = ${fecha},
          hora = ${hora},
          estadoreservaid = ${estadoreservaid},
          zonacampotiroid = ${zonacampotiroid},
          montopagado = ${montopagado}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

// Eliminar reserva
export const deleteBooking = async (id) => {
  try {
    const result = await db`
      DELETE FROM reservas WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

export const getBookingStatusNameAndId = async () => {
  try {
    const result = await db`
      SELECT id, descripcion FROM estadosreserva;
    `;
    return result;
  } catch (error) {
    console.error("Error fetching booking status:", error);
    throw error;
  }
}