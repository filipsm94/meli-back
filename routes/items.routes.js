const express = require('express');
const router = express.Router();

const {buscarProductos, buscarProducto} = require('../controller/items.controller');

router.get('/', buscarProductos);
router.get('/:id', buscarProducto);


module.exports = router;
