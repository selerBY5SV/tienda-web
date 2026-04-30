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

// Crear pedido
const createPedido = (pedido, callback) => {
    const { usuario_id, producto_id, cantidad } = pedido;

    db.run(
        'INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)',
        [usuario_id, producto_id, cantidad],
        function (err) {
            callback(err, { id: this.lastID, usuario_id, producto_id, cantidad });
        }
    );
};

// Actualizar pedido
const updatePedido = (id, pedido, callback) => {
    const { usuario_id, producto_id, cantidad } = pedido;

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