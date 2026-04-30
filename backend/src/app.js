require('./config/database');
const express = require('express');

const usuariosRoutes = require('./routes/usuarios.routes');
const productosRoutes = require('./routes/productos.routes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});