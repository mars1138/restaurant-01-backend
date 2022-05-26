const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const ContactItem = require('../models/contactItem');

const createContactItem = async (req, res, next) => {
  const errors =  validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data', 422));
  }

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

const getContactItems = async (req, res, next) => {
  let contactItems;

  try { 
    contactItems = await ContactItem.find();
  } catch (err) {
    const error = new HttpError('Fetching contacts failed, try again', 500);
    return next(error);
  }

  if (!contactItems || contactItems.length === 0) {
  const error = new HttpError('No contacts to fetch!', 400);
  return next(error);
  }


  res.json({ contacts: contactItems.map((contact) => contact.toObject({getters: true})),
  });
};



exports.createContactItem = createContactItem;
exports.getContactItems = getContactItems;
