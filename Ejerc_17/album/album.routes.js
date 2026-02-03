const express = require('express');
const router = express.Router();
const controller = require('./album.controller');

router.get('/', controller.list);
router.get('/delete/:id', controller.delete);
router.get('/form', controller.form);
router.post('/save', controller.save);

module.exports = router;
