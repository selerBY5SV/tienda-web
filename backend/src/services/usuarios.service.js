const db = require('../config/database');

// Obtener todos los usuarios
const getUsuarios = (callback) => {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
        callback(err, rows);
    });
};

// Crear usuario
const createUsuario = (usuario, callback) => {
    const { nombre, email } = usuario;

    db.run(
        'INSERT INTO usuarios (nombre, email) VALUES (?, ?)',
        [nombre, email],
        function (err) {
            callback(err, { id: this.lastID, nombre, email });
        }
    );
};

// Actualizar usuario
const updateUsuario = (id, usuario, callback) => {
    const { nombre, email } = usuario;

    db.run(
        'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?',
        [nombre, email, id],
        function (err) {
            callback(err);
        }
    );
};

// Eliminar usuario
const deleteUsuario = (id, callback) => {
    db.run(
        'DELETE FROM usuarios WHERE id = ?',
        [id],
        function (err) {
            callback(err);
        }
    );
};

module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
};