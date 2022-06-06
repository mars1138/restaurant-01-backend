const express = require('express');

const orderController = require('../controllers/order-controller');

const router = express.Router();

router.options('*', (req, res) => res.sendStatus(200));
router.post('/stripe-order', orderController.stripeOrder);

router.post('/', orderController.createOrder);

module.exports = router;
