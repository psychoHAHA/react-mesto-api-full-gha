const { ERROR_FORBIDDEN } = require('./errors');

class ErrorForbiden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_FORBIDDEN;
  }
}

module.exports = ErrorForbiden;
