const { ERROR_INTERNAL_SERVER } = require('../errors/errors');

module.exports.errorHandle = (err, req, res, next) => {
  const { statusCode = ERROR_INTERNAL_SERVER } = err;
  const message =
    statusCode === 500
      ? 'На сервере произошла ошибка'
      : err.message;

  res.status(statusCode).send({ message });

  next();
};
