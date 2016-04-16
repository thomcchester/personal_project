var express = require('express');
var router = express.Router();

var path = require('path');

var connection = require('../modules/connection');
var pg = require('pg');
var passport = require('passport');


router.get('/',function(request,response){

    pg.connect(connection,function(err,client,done){
        if(err){
            done();
            console.log("error connecting to database",err);
            response.status(500).send(err);
        } else{
            var results = [];
            var query = client.query("SELECT * FROM ex");
            console.log("connected");
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
