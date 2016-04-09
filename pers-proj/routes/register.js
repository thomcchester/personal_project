var express = require('express');
var router = express.Router();
var passport = require('passport');
// var Users = require('../models/user');
var path = require('path');

// module with bcrypt functions
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

// Handles request for HTML file
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {


  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    sex: req.body.sex,
    agreetos: req.body.agreetos
  };
  console.log('new user:', saveUser);


  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO users (username, password, first_name, last_name, email, sex, agreetos) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      [saveUser.username, saveUser.password, saveUser.first_name, saveUser.last_name, saveUser.email, saveUser.sex, saveUser.agreetos],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });
  });


});


module.exports = router;
