var express = require('express');
var router = express.Router();

var path = require('path');

var connection = require('../modules/connection');
var pg = require('pg');

// router.get('/', function(req, res, next) {
//     res.sendFile(path.resolve(__dirname, '../public/views/create.html'));
// });

router.post('/', function(req, res, next) {

  var createExType = {
    name: req.body.name,
    description: req.body.description,
    bodyRegion: req.body.bodyRegion,
    deviceType: req.body.deviceType,
    time:req.body.time,
    weight:req.body.weight,
    reps:req.body.reps,
    user:req.body.user
  };

  pg.connect(connection, function(err, client, done) {

    client.query("INSERT INTO extype (name, description, body_region, device_type, time, reps, weight, user_as) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      [createExType.name, createExType.description, createExType.bodyRegion, createExType.deviceType, createExType.time, createExType.reps, createExType.weight, createExType.user],
        function (err, result) {

          client.end();

          if(err) {
            console.log("Error inserting data into Dare: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });


  });

});

module.exports = router;
