const express = require('express');
const bodyParser = require('body-parser');

const HttpError = require('./models/http-error');
const menuRoutes = require('./routes/menu-routes');
const orderRoutes = require('./routes/order-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);

  res.status(error.code || 500);
  res.json({ message: error.message || 'An Unknown error occurred!' });
});

app.listen(5000);
