const jwt = require('jsonwebtoken');
require('dotenv');

exports.auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json('Unauthorized, login first');
  }

  jwt.verify(token, process.env.SECRET, {}, (err, user) => {
    if (err) {
      return res.status(401).json('Unauthorized user detected');
    }
    req.user = user;
    next();
  });
};
