let connection = require('../connection')
let mysql = require('mysql')
let md5 = require('md5')
let response = require('../res')
let jwt = require('jsonwebtoken')
let config = require('../config/secret')
let ip = require('ip')

// controller for register
exports.registration = function (req, res) {
  let post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    created_at: new Date()
  }

  let query = "SELECT email FROM ?? WHERE ??=?";
  let table = ["users", "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        let query = "INSERT INTO ?? SET ?";
        let table = ["users"];

        query = mysql.format(query, table);

        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            response.ok("Register Success", res);
          }
        });
      } else {
        response.ok("email already exists!", res);
      }
    }
  })
}

// login controller
exports.login = function(req, res) {
  let post = {
    email: req.body.email,
    password: req.body.password
  }

  let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  let table = ["users", "password", md5(post.password), "email", post.email];

  query = mysql.format(query, table);
  connection.query(query, function(error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        let token = jwt.sign({rows}, config.secret, {
          expiresIn: 1440
        });

        user_id = rows[0].id;

        let data = {
          id_user: user_id,
          token: token,
          ip_address: ip.address()
        }

        let query = "INSERT INTO ?? SET ?";
        let table = ["token_access"];

        query = mysql.format(query, table);
        connection.query(query, data, function(error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: 'JWT token generated',
              token: token,
              currUser: data.user_id
            });
          }
        });
      } else {
        res.json({"Error": true, "message":"Email and password do not match!"});
      }
    }
  })
}