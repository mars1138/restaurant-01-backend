const HttpError = require('../models/http-error');

const createOrder = (req, res, next) => {
  res.json({ message: 'Order created!' });
};

module.exports.createOrder = createOrder;
