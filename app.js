const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const menuRoutes = require('./routes/menu-routes');
const orderRoutes = require('./routes/order-routes');
const contactRoutes = require('./routes/contact-routes');

const app = express();
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors({ origin: `${process.env.CLIENT_URL}` }));

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An Unknown error occurred!' });
  // if (res.headerSent) return next(error);
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ffsce.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log();
  });
