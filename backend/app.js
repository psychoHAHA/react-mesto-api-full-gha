const mongoose = require('mongoose');

const helmet = require('helmet');

const { errors } = require('celebrate');

const express = require('express');

const router = require('./routes/index');

const { errorHandle } = require('./middlewares/errorHandler');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(helmet());

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use(errors());

app.use(errorHandle);

app.listen(PORT, () => {
  console.log(123);
});
