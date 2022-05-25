const HttpError = require('../models/http-error');

const getMenu = (req, res, next) => {
  res.json({ message: 'menu accessed!' });
};

exports.getMenu = getMenu;
