var express = require('express');
var router = express.Router();

var path = require('path');

var connection = require('../modules/connection');
var pg = require('pg');

// router.get('/', function(req, res, next) {
//     res.sendFile(path.resolve(__dirname, '../public/views/create.html'));
// });

router.post('/', function(req, res, next) {
  var doExercise = {
    exercise: req.body.exercise,
    weight: req.body.wieght,
    restTime: req.body.restTime,
    pain: req.body.pain,
    time:req.body.time,
    quality:req.body.quality,
    reps:req.body.reps,
    user:req.body.user
  };

  pg.connect(connection, function(err, client, done) {

    client.query("INSERT INTO ex (exercise, weight, reps, time, rest_time, quality, pain, user_as) VALUES ($1, $2, $3,$4,$5, $6, $7, $8) RETURNING id",
      [doExercise.exercise, doExercise.weight, doExercise.reps, doExercise.time, doExercise.rest_time, doExercise.quality, doExercise.pain, doExercise.user],
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
