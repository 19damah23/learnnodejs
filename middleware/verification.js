const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const config =  require('../config/secret');

function verification() {
  return function (req, rest, next) {
    let role = req.body.role;

    // authorization header check
    let tokenWithBearer = req.headers.authorization;

    if (tokenWithBearer) {
      let token = tokenWithBearer.split(' ')[1];

      // verification
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          return rest.status(401).send({auth: false, message: 'token is not registered!'});
        } else {
          if (role == 1) {
            req.auth = decoded;
            next();
          } else {
            return rest.status(401).send({auth:false, message:'failed to authorize your role'});
          }
        }
      });
    } else {
      return rest.status(401).send({auth:false, message:'token not found'});
    }
  }
}

module.exports = verification