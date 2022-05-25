const express = require('express');

const menuController = require('../controllers/menu-controller');

const router = express.Router();

router.get('/', menuController.getMenu);

router.post('/', menuController.createMenuItem);

module.exports = router;
