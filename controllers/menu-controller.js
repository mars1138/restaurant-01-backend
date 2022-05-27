const HttpError = require('../models/http-error');
const MenuItem = require('../models/menuItem');

const getMenu = async (req, res, next) => {
  let dishes;

  try {
    dishes = await MenuItem.find();
  } catch (err) {
    const error = new HttpError('Fetching menu failed, please try again', 500);
    return next(error);
  }

  if (!dishes || dishes.length === 0) {
    const error = new HttpError('No menu items to fetch', 400);
    return next(error);
  }

  res.json(dishes.map((dish) => dish.toObject({ getters: true })),);
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
    await createdMenuItem.save();
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
