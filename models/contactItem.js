const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  comments: { type: String },
});

module.exports = mongoose.model('Contact', contactSchema);
