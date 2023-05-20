const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');
const { errors } = require('./node_modules/celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

const app = express();

mongoose
  .connect('mongodb://127.0.0.1/mestodb');

app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Что-то пошло не так...'
      : message,
  });
  next();
});

app.listen(3000, () => {});
