<<<<<<< HEAD
var express = require("express");
var router = express.Router({mergeParams: true});
var Cloth = require("../models/cloth");

router.get("/", function(req, res){
    Cloth.find({tag1: "infantil masculino"}, function(err, allClothes){
        if(err){
            console.log(err);
        } else{
            res.render("infMasculino", {clothes: allClothes});
        }
    })
});

router.get("/:tag2", function(req, res){
    Cloth.find({tag1: "infantil masculino", tag2: req.params.tag2}, function(err, allClothes){
        if(err){
            console.log(err);
        } else{
            res.render("infMasculino", {clothes: allClothes});
        }
    })
});

=======
var express = require("express");
var router = express.Router({mergeParams: true});
var Cloth = require("../models/cloth");

router.get("/", function(req, res){
    Cloth.find({tag1: "infantil masculino"}, function(err, allClothes){
        if(err){
            console.log(err);
        } else{
            res.render("landing", {clothes: allClothes});
        }
    })
});

router.get("/:tag2", function(req, res){
    Cloth.find({tag1: "infantil masculino", tag2: req.params.tag2}, function(err, allClothes){
        if(err){
            console.log(err);
        } else{
            res.render("landing", {clothes: allClothes});
        }
    })
});

>>>>>>> 9b52bc9d29036fb0ab8fc1e5e0d39cef5f46a069
module.exports = router;