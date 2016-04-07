var express = require("express");
var router = express.Router();
var path = require("path");
var Heroes = require("../models/heroes.js");


router.get("/hero", function(req,res){
    Heroes.find({}, function(err,data){
        if(err){
            console.log("index js hero error",err);
        }
        res.send(data);
    });
});

router.post("/hero", function(req,res){
    console.log("req body",req.body);
    var addedHero = new Heroes({"Alias" : req.body.Alias, "FirstName" : req.body.FirstName, "LastName" : req.body.LastName, "City" : req.body.City, "PowerName": req.body.PowerName});
    addedHero.save(function(err, data){
        if(err){
            console.log("hero save error",err);
        }
        res.send(data);
    });
});

router.delete("/hero/:id", function(req,res){
    console.log("indexJs error deleete", req.params.id);
    Heroes.remove({_id: req.params.id},function(err,data){
        if(err){
            console.log(err);
        }
        res.status(200).send();
    });
});

router.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;
