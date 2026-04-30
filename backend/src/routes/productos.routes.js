const express = require('express');
const router = express.Router();
const productosService = require('../services/productos.service');

// GET todos los productos
router.get('/', (req, res) => {
    productosService.getProductos((err, productos) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(productos);
    });
});

// POST crear producto
router.post('/', (req, res) => {
    productosService.createProducto(req.body, (err, productoCreado) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear producto' });
        }
        res.status(201).json(productoCreado);
    });
});

// PUT actualizar producto
router.put('/:id', (req, res) => {
    productosService.updateProducto(req.params.id, req.body, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar producto' });
        }
        res.json({ mensaje: 'Producto actualizado correctamente' });
    });
});

// DELETE eliminar producto
router.delete('/:id', (req, res) => {
    productosService.deleteProducto(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar producto' });
        }
        res.json({ mensaje: 'Producto eliminado correctamente' });
    });
});

module.exports = router;