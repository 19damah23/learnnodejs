'use strict';

const { response } = require("express");

module.exports = function(app) {
  let myjson = require('./controller');

  app.route('/')
    .get(myjson.index);

  app.route('/view')
    .get(myjson.showAll);

  app.route('/view/:id')
    .get(myjson.show);

  app.route('/add')
    .post(myjson.add);

  app.route('/edit')
    .put(myjson.edit);
}