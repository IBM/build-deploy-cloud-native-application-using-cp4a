const express = require('express');

module.exports = function (app) {
  const router = express.Router();

  router.get('/', function (req, res, next) {
    const stringToReturn = "Hey there, this is codewind saying hi and thanks for using me"
    res.status(200).send(stringToReturn);
    });

  app.use('/codewind', router);
}