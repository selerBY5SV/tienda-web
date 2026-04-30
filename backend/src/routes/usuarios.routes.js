const express = require('express');
const router = express.Router();
const usuariosService = require('../services/usuarios.service');

// GET todos los usuarios
router.get('/', (req, res) => {
    usuariosService.getUsuarios((err, usuarios) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }

        res.json(usuarios);
    });
});

// POST crear usuario
router.post('/', (req, res) => {
    usuariosService.createUsuario(req.body, (err, usuarioCreado) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear usuario' });
        }

        res.status(201).json(usuarioCreado);
    });
});

// PUT actualizar usuario
router.put('/:id', (req, res) => {
    usuariosService.updateUsuario(req.params.id, req.body, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar usuario' });
        }

        res.json({ mensaje: 'Usuario actualizado correctamente' });
    });
});

// DELETE eliminar usuario
router.delete('/:id', (req, res) => {
    usuariosService.deleteUsuario(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }

        res.json({ mensaje: 'Usuario eliminado correctamente' });
    });
});

module.exports = router;