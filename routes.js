'use strict';

const { response } = require("express");

module.exports = function(app) {
  let myjson = require('./controller');

  app.route('/')
    .get(myjson.index);

  app.route('/view')
    .get(myjson.showAll);
}