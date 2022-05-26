const HttpError = require('../models/http-error');
const ContactItem = require('../models/contactItem');

const createContactItem = async (req, res, next) => {
  const { name, email, phone, comments } = req.body;

  const createdContactItem = new ContactItem({
    name,
    email,
    phone: phone || null,
    comments: comments || '',
  });

  try {
    await createdContactItem.save();
  } catch (err) {
    const error = new HttpError('Sending contact info, please try again', 500);
    return next(error);
  }

  res.status(201).json({
    message: 'Contact item created!',
    contactItem: createdContactItem.toObject({ getters: true }),
  });
};

exports.createContactItem = createContactItem;
