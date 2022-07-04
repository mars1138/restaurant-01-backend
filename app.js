const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const menuRoutes = require('./routes/menu-routes');
const orderRoutes = require('./routes/order-routes');
const contactRoutes = require('./routes/contact-routes');

const app = express();
const cors = require('cors');

app.use(bodyParser.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  })
);

// app.use((req, res, next) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, DELETE, OPTIONS'
//   );

//   if (req.method === 'OPTIONS') {
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'POST, PUT, PATCH, GET, DELETE, OPTIONS'
//     );
//     return res.status(200).json({});
//   }
//   next();
// });

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
    app.listen(5000);
  })
  .catch((err) => {
    console.log();
  });
