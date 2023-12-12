const mongoose = require('mongoose');

const helmet = require('helmet');

const { errors } = require('celebrate');

const express = require('express');

const cors = require('cors');

const router = require('./routes/index');

const { errorHandle } = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(helmet());

mongoose.connect(MONGO_URL);

app.use(express.json());

app.use(requestLogger);

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:3000', 'https://psychedelicmesto.nomoredomainsmonster.ru/', 'https://api.psychedelicmesto.nomoredomainsmonster.ru/'],
  credentials: true,
  maxAge: 300000000,
}));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandle);

app.listen(PORT, () => {});
