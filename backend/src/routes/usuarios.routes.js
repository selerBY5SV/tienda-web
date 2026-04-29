const express = require('express');
const router = express.Router();

// GET todos los usuarios
router.get('/', (req, res) => {
    res.json({ mensaje: 'Listado de usuarios' });
});

// POST crear usuario
router.post('/', (req, res) => {
    res.json({ mensaje: 'Usuario creado' });
});

// PUT actualizar usuario
router.put('/:id', (req, res) => {
    res.json({ mensaje: `Usuario ${req.params.id} actualizado` });
});

// DELETE eliminar usuario
router.delete('/:id', (req, res) => {
    res.json({ mensaje: `Usuario ${req.params.id} eliminado` });
});

module.exports = router;