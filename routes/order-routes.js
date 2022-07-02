const express = require('express');
const { check } = require('express-validator');

const orderController = require('../controllers/order-controller');

const router = express.Router();

router.options('*', (req, res) => res.sendStatus(200));
router.post(
  '/stripe-order',
  [check('location').not().isEmpty(), check('pickupTime').not().isEmpty()],
  orderController.stripeOrder
);

router.post('/', orderController.createOrder);

module.exports = router;
