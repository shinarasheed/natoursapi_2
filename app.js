const express = require('express');
const morgan = require('morgan');
const connectDb = require('./config/db');

//connect to database
connectDb();

const app = express();
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

//MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

app.use(express.json());

//mount routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//unhandled routes response
app.all('*', (req, res, next) => {
  res
    .status(404)
    .json({ status: 'fail', message: `Can't find ${req.originalUrl}` });
  // next();
});

module.exports = app;
