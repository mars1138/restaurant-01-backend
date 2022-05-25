const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
