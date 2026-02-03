const express = require('express');
const router = express.Router();
const controller = require('./artista.controller');

router.get('/', controller.list);
router.get('/form', controller.form);
router.post('/save', controller.save);
router.get('/delete/:id', controller.delete);
router.get('/:id', controller.detail);

module.exports = router;

