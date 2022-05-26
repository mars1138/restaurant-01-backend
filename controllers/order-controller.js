const HttpError = require('../models/http-error');
const Order = require('../models/order');

const createOrder = async (req, res, next) => {
const { name, email, phone, street, city, zip, creditCard, items } = req.body;

const createdOrder = new Order({
  name, email, phone, street, city, zip, creditCard, items
});

try {
 await createdOrder.save();
} catch (err) {
  const error = new HttpError('Sending order failed, try again', 500);
  return next(error);
}

  res.status(201).json({ message: 'Order created!', order: createdOrder.toObject({getters: true}) });
};

module.exports.createOrder = createOrder;
