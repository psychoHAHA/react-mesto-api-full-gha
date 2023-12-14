const jwt = require('jsonwebtoken');
const ErrorAuth = require('../errors/errorAuth');

const { JWT_SECRET, NODE_ENV = '' } = process.env;

module.exports = async (req, res, next) => {
  let payload;
  try {
    const token = req.headers;
    if (!token) {
      throw new ErrorAuth('Необходимо пройти авторизацию');
    }

    const validToken = token.replace('Bearer ', '');
    payload = await jwt.verify(
      validToken,
      NODE_ENV ? JWT_SECRET : 'dev_secret');
  } catch (error) {
    throw new ErrorAuth('Необходимо пройти авторизацию');
  }

  req.user = payload;
  next();
};
