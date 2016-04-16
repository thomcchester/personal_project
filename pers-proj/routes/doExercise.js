var express = require('express');
var router = express.Router();

var path = require('path');

var connection = require('../modules/connection');
var pg = require('pg');
var passport = require('passport');
// router.get('/', function(req, res, next) {
//     res.sendFile(path.resolve(__dirname, '../public/views/create.html'));
// });

router.post('/', function(req, res, next) {
  var doExercise = {
    exercise: req.body.exercise,
    weight: req.body.weight,
    restTime: req.body.restTime,
    pain: req.body.pain,
    time:req.body.time,
    quality:req.body.quality,
    reps:req.body.reps,
    user:req.body.user,
    date:req.body.date
  };

  pg.connect(connection, function(err, client, done){
    client.query("INSERT INTO ex (exercise, weight, reps, time, rest_time, quality, pain, user_as, date) VALUES ($1, $2, $3,$4,$5, $6, $7, $8,$9) RETURNING id",
      [doExercise.exercise, doExercise.weight, doExercise.reps, doExercise.time, doExercise.restTime, doExercise.quality, doExercise.pain, doExercise.user, doExercise.date],
        function (err, result) {

          client.end();

          if(err) {
            console.log("Error inserting", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });


  });

});

router.get('/', function(req, res) {
    // check if logged in
    if(req.isAuthenticated()) {
        // send back user object from database
        res.send(req.user);
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});

module.exports = router;
