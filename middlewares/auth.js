const jwt = require('jsonwebtoken');
const ValidationError = require('../errors/ValidationError');

// const extractBearerToken = (header) => {
//   header.replace('Bearer ', '');
// };

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // !authorization || !authorization.startsWith('Bearer ')
  if (!token) {
    throw new ValidationError('Необходима авторизация');
  }

  // const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new ValidationError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
