import db from "../config/db"; 

export const createFullSale = async ({ clienteId, usuarioId, metodoPagoId, productos }) => {
    const fecha = new Date();
    const total = productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

    try {
        // Iniciar la transacción
        await db.begin();

        // Insertar la venta
        const [ventaResult] = await db`
            INSERT INTO Ventas (ClienteID, UsuarioID, Fecha, MetodoPagoID, Total)
            VALUES (${clienteId}, ${usuarioId}, ${fecha}, ${metodoPagoId}, ${total})
            RETURNING ID
        `;
        const ventaId = ventaResult.id;

        // Insertar productos y actualizar inventario
        for (const producto of productos) {
            await db`
                INSERT INTO VentaProductos (VentaID, ProductoID, Cantidad, PrecioUnitario)
                VALUES (${ventaId}, ${producto.productoId}, ${producto.cantidad}, ${producto.precio})
            `;

            await db`
                UPDATE Inventario
                SET Cantidad = Cantidad - ${producto.cantidad}
                WHERE ID = ${producto.productoId}
            `;
        }

        // Confirmar la transacción
        await db.commit();

        return { ventaId, total };

    } catch (error) {
        // Revertir la transacción si ocurre un error
        await db.rollback();
        console.error("Error creating full sale:", error);
        throw error;
    }
};


export const getAllSales = async () => {
    try {
        const result = await db`
            SELECT
                v.ID AS venta_id,
                v.Fecha,
                v.Total,

                c.ID AS cliente_id,
                c.Nombre AS cliente_nombre,
                c.Apellido AS cliente_apellido,
                c.Correo AS cliente_correo,
                c.Telefono AS cliente_telefono,

                u.ID AS usuario_id,
                u.Nombre AS usuario_nombre,
                u.Correo AS usuario_correo,

                m.ID AS metodo_pago_id,
                m.Tipo AS metodo_pago,

                vp.ID AS venta_producto_id,
                i.ID AS producto_id,
                i.NombreProducto,
                vp.Cantidad,
                vp.PrecioUnitario

            FROM Ventas v
            JOIN Clientes c ON v.ClienteID = c.ID
            JOIN Usuarios u ON v.UsuarioID = u.ID
            JOIN MetodosDePago m ON v.MetodoPagoID = m.ID
            LEFT JOIN VentaProductos vp ON v.ID = vp.VentaID
            LEFT JOIN Inventario i ON vp.ProductoID = i.ID
            ORDER BY v.ID DESC;
        `;
        return result;
    } catch (error) {
        console.error("Error fetching sales:", error);
        throw error;
    }
};

export const updateFullSale = async (id, { clienteId, usuarioId, metodoPagoId, productos }) => {
    return await db.transaction(async tx => {
        // 1. Obtener productos actuales
        const currentProducts = await tx`
            SELECT ProductoID, Cantidad FROM VentaProductos WHERE VentaID = ${id};
        `;
        const currentMap = new Map(currentProducts.map(p => [p.productoid, p.cantidad]));

        // 2. Actualizar venta
        await tx`
            UPDATE Ventas
            SET ClienteID = ${clienteId}, UsuarioID = ${usuarioId}, MetodoPagoID = ${metodoPagoId}
            WHERE ID = ${id};
        `;

        // 3. Eliminar productos anteriores
        await tx`DELETE FROM VentaProductos WHERE VentaID = ${id};`;

        // 4. Insertar nuevos productos y ajustar inventario
        let newTotal = 0;
        for (const producto of productos) {
            const { productoId, cantidad, precioUnitario } = producto;
            newTotal += cantidad * precioUnitario;

            await tx`
                INSERT INTO VentaProductos (VentaID, ProductoID, Cantidad, PrecioUnitario)
                VALUES (${id}, ${productoId}, ${cantidad}, ${precioUnitario});
            `;

            const oldCantidad = currentMap.get(productoId) || 0;
            const diff = cantidad - oldCantidad;

            await tx`
                UPDATE Inventario SET Cantidad = Cantidad - ${diff} WHERE ID = ${productoId};
            `;
            currentMap.delete(productoId);
        }

        // 5. Revertir inventario de productos eliminados
        for (const [productoId, cantidad] of currentMap.entries()) {
            await tx`
                UPDATE Inventario SET Cantidad = Cantidad + ${cantidad} WHERE ID = ${productoId};
            `;
        }

        // 6. Actualizar total
        await tx`
            UPDATE Ventas SET Total = ${newTotal} WHERE ID = ${id};
        `;

        return { id, clienteId, usuarioId, metodoPagoId, productos, total: newTotal };
    });
};

export const deleteFullSale = async (id) => {
    return await db.transaction(async tx => {
        // 1. Obtener productos asociados
        const productos = await tx`
            SELECT ProductoID, Cantidad FROM VentaProductos WHERE VentaID = ${id};
        `;

        // 2. Revertir inventario
        for (const p of productos) {
            await tx`
                UPDATE Inventario SET Cantidad = Cantidad + ${p.cantidad} WHERE ID = ${p.productoid};
            `;
        }

        // 3. Eliminar VentaProductos
        await tx`DELETE FROM VentaProductos WHERE VentaID = ${id};`;

        // 4. Eliminar Venta
        await tx`DELETE FROM Ventas WHERE ID = ${id};`;

        return { message: "Venta eliminada correctamente" };
    });
};