const express = require('express');
const router = express.Router();
const controller = require('../controllers/prestamoController');

router.get('/prestados', controller.prestados);
router.get('/prestamos/usuario', controller.usuario);
router.get('/prestamo/formulario/:libro_id', controller.formulario);
router.post('/prestamo/nuevo', controller.crear);
router.post('/prestamo/devolver/:libro_id', controller.devolver);
router.get('/vencidos', controller.vencidos);

module.exports = router;
