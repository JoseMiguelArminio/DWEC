const express = require('express');
const router = express.Router();
const controller = require('../controllers/libroController');

router.get('/', controller.index);
router.get('/libro/:id', controller.detalle);

module.exports = router;
