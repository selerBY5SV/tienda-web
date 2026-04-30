const express = require('express');
const router = express.Router();
const pedidosService = require('../services/pedidos.service');

// GET todos los pedidos
router.get('/', (req, res) => {
    pedidosService.getPedidos((err, pedidos) => {
        if (err) {
            console.error('ERROR PEDIDOS:', err.message);
            return res.status(500).json({ error: err.message });
        }

        res.json(pedidos);
    });
});

// POST crear pedido
router.post('/', (req, res) => {
    pedidosService.createPedido(req.body, (err, pedidoCreado) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        res.status(201).json(pedidoCreado);
    });
});

// PUT actualizar pedido
router.put('/:id', (req, res) => {
    pedidosService.updatePedido(req.params.id, req.body, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar pedido' });
        }

        res.json({ mensaje: 'Pedido actualizado correctamente' });
    });
});

// DELETE eliminar pedido
router.delete('/:id', (req, res) => {
    pedidosService.deletePedido(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar pedido' });
        }

        res.json({ mensaje: 'Pedido eliminado correctamente' });
    });
});

module.exports = router;