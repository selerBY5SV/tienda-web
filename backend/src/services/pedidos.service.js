const db = require('../config/database');

// Obtener todos los pedidos con datos de usuario y producto
const getPedidos = (callback) => {
    db.all(`
        SELECT 
            pedidos.id,
            pedidos.usuario_id,
            usuarios.nombre AS usuario,
            pedidos.producto_id,
            productos.nombre AS producto,
            pedidos.cantidad
        FROM pedidos
        LEFT JOIN usuarios ON pedidos.usuario_id = usuarios.id
        LEFT JOIN productos ON pedidos.producto_id = productos.id
    `, [], (err, rows) => {
        callback(err, rows);
    });
};

// Crear pedido comprobando stock
const createPedido = (pedido, callback) => {
    const usuario_id = Number(pedido.usuario_id);
    const producto_id = Number(pedido.producto_id);
    const cantidad = Number(pedido.cantidad);

    if (!usuario_id || !producto_id || !cantidad || cantidad <= 0) {
        return callback(new Error('Datos del pedido no válidos'));
    }

    db.get(
        'SELECT id, nombre, stock FROM productos WHERE id = ?',
        [producto_id],
        (err, producto) => {
            if (err) {
                return callback(err);
            }

            if (!producto) {
                return callback(new Error('El producto seleccionado no existe'));
            }

            if (cantidad > Number(producto.stock)) {
                return callback(new Error(`No hay stock suficiente. Stock disponible: ${producto.stock}`));
            }

            db.run(
                'INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)',
                [usuario_id, producto_id, cantidad],
                function (err) {
                    if (err) {
                        return callback(err);
                    }

                    db.run(
                        'UPDATE productos SET stock = stock - ? WHERE id = ?',
                        [cantidad, producto_id],
                        (errStock) => {
                            if (errStock) {
                                return callback(errStock);
                            }

                            callback(null, {
                                id: this.lastID,
                                usuario_id,
                                producto_id,
                                cantidad
                            });
                        }
                    );
                }
            );
        }
    );
};

// Actualizar pedido
const updatePedido = (id, pedido, callback) => {
    const usuario_id = Number(pedido.usuario_id);
    const producto_id = Number(pedido.producto_id);
    const cantidad = Number(pedido.cantidad);

    db.run(
        'UPDATE pedidos SET usuario_id = ?, producto_id = ?, cantidad = ? WHERE id = ?',
        [usuario_id, producto_id, cantidad, id],
        function (err) {
            callback(err);
        }
    );
};

// Eliminar pedido
const deletePedido = (id, callback) => {
    db.run(
        'DELETE FROM pedidos WHERE id = ?',
        [id],
        function (err) {
            callback(err);
        }
    );
};

module.exports = {
    getPedidos,
    createPedido,
    updatePedido,
    deletePedido
};