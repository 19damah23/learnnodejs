'use strict';

let response = require('./res');
let connection = require('./connection');

exports.index = function(req, res) {
  response.ok('My aplication is running!', res);
}

// displays all data from the student table
exports.showAll = function(req, res) {
  connection.query("SELECT * FROM students", function(error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
}

// displays student data based on id
exports.show = function(req, res) {
  let id = req.params.id;
  connection.query("SELECT * FROM students WHERE id = ?", [id],
   function(error, rows, fields) {
     if (error) {
       console.log(error);
     } else {
       response.ok(rows, res);
     }
   });
}