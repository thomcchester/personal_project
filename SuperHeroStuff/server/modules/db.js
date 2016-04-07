var mongoose = require("mongoose");

var mongoURI =
   process.env.MONGOLAB_URI ||
   process.env.MONGOHQ_URL ||
   'mongodb://localhost/Hero_DB';

var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on("error", function(err){
    console.log("mongo connection error:", err);
});

mongoDB.on("open", function(err){
    console.log("mongo connection open:");
});

module.exports = mongoDB;
