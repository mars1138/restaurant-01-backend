const { validationResult } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const HttpError = require('../models/http-error');
const MenuItem = require('../models/menuItem');
const Order = require('../models/order');

const getMenuItems = async () => {
  let dishes;

  try {
    dishes = await MenuItem.find().exec();
  } catch (err) {
    const error = new HttpError('Fetching menu failed, please try again', 500);
    console.log(error);
  }

  if (!dishes || dishes.length === 0) {
    const error = new HttpError('No menu items to fetch', 400);
    console.log(error);
    return error;
  }

  return dishes.map((dish) => dish.toObject({ getters: true }));
};

let menuItems;

(async function () {
  try {
    menuItems = await getMenuItems();
  } catch (err) {
    console.log(err);
  }
})();

const stripeOrder = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Please enter a valid location and time!', 422));
  }

  const { items, location, pickupTime } = req.body;

  try {
    console.log('location: ', req.body.location);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item) => {
        const lineItem = menuItems.find((menuItem) => menuItem.id === item.id);
        console.log('lineItem: ', lineItem);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: lineItem.name,
            },
            unit_amount: lineItem.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      payment_intent_data: {
        description: `Pickup info: ${location} ${pickupTime}`,
      },
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/menu`,
    });

    res.status(201).json({
      url: session.url,
    });
  } catch (err) {
    console.log(err);
  }
};

const createOrder = async (req, res, next) => {
  const {
    name,
    email,
    phone,
    street,
    city,
    zipCode,
    creditCard,
    items,
  } = req.body;

  const createdOrder = new Order({
    name,
    email,
    phone,
    street,
    city,
    zipCode,
    creditCard,
    items,
  });

  try {
    await createdOrder.save();
    console.log('order submitted!');
  } catch (err) {
    const error = new HttpError('Sending order failed, try again', 500);
    return next(error);
  }

  res.status(201).json({
    message: 'Order created!',
    order: createdOrder.toObject({ getters: true }),
  });
};

exports.createOrder = createOrder;
exports.stripeOrder = stripeOrder;
