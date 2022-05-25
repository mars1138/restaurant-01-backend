const HttpError = require('../models/http-error');
const MenuItem = require('../models/menuItem');

const getMenu = (req, res, next) => {
  res.json({ message: 'menu accessed!' });
};

const createMenuItem = async (req, res, next) => {
  const { name, description, price, type, imgUrl } = req.body;

  const createdMenuItem = new MenuItem({
    name,
    description,
    price,
    type,
    imgUrl,
  });

  console.log(createdMenuItem);

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError('Creating menu item failed, try again', 500);
    return next(error);
  }

  res
    .status(201)
    .json({ message: 'menu item created!', menuItem: createdMenuItem });
};

exports.getMenu = getMenu;
exports.createMenuItem = createMenuItem;
