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

router.get('/',function(request,response){

    pg.connect(connection,function(err,client,done){
        if(err){
            done();
            console.log("error connecting to database",err);
            response.status(500).send(err);
        } else{
            var results = [];
            var query = client.query("SELECT name FROM extype");
        }
        query.on('row',function(row){
            console.log(row);
            results.push(row);
        });
        query.on('end',function(){
            done();
            response.send(results);
        });
        query.on('error',function(error){
            console.log('Error returning query', error);
            done();
            response.status(500).send(error);
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
