const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta a la base de datos
const dbPath = path.join(__dirname, '../../database.sqlite');

// Crear conexión
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('Conectado a SQLite');
    }
});

// Ejecutar las creaciones en orden (importante para evitar errores)
db.serialize(() => {

    // Crear tabla usuarios si no existe
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            email TEXT
        )
    `);

    // Crear tabla productos si no existe
    db.run(`
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            precio REAL,
            stock INTEGER
        )
    `);

    // Crear tabla pedidos (relaciona usuarios y productos)
    db.run(`
        CREATE TABLE IF NOT EXISTS pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER,
            producto_id INTEGER,
            cantidad INTEGER,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
            FOREIGN KEY (producto_id) REFERENCES productos(id)
        )
    `);

});

// Exportar la conexión
module.exports = db;