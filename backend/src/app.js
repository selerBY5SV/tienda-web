const express = require('express');
const cors = require('cors');
require('./config/database');

const usuariosRoutes = require('./routes/usuarios.routes');
const productosRoutes = require('./routes/productos.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});