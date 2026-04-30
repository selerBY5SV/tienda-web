const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/database');

const usuariosRoutes = require('./routes/usuarios.routes');
const productosRoutes = require('./routes/productos.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);
app.use('/frontend', express.static(path.join(__dirname, '../../frontend')));

app.get('/', (req, res) => {
    res.redirect('/frontend/index.html');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});