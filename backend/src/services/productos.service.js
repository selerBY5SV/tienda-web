const db = require('../config/database');

// Obtener todos los productos
const getProductos = (callback) => {
    db.all('SELECT * FROM productos', [], (err, rows) => {
        callback(err, rows);
    });
};

// Crear producto
const createProducto = (producto, callback) => {
    const { nombre, precio, stock } = producto;

    db.run(
        'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
        [nombre, precio, stock],
        function (err) {
            callback(err, { id: this.lastID, nombre, precio, stock });
        }
    );
};

// Actualizar producto
const updateProducto = (id, producto, callback) => {
    const { nombre, precio, stock } = producto;

    db.run(
        'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
        [nombre, precio, stock, id],
        function (err) {
            callback(err);
        }
    );
};

// Eliminar producto
const deleteProducto = (id, callback) => {
    db.run(
        'DELETE FROM productos WHERE id = ?',
        [id],
        function (err) {
            callback(err);
        }
    );
};

module.exports = {
    getProductos,
    createProducto,
    updateProducto,
    deleteProducto
};