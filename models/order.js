const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: Number, required: true },
  creditCard: { type: Number, required: true },
  items: { type: Array },
});

module.exports = mongoose.model('Order', orderSchema);
