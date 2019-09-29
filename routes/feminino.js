var express = require("express");
var router = express.Router({mergeParams: true});
var Cloth = require("../models/cloth");

router.get("/", function(req, res){
    Cloth.find({tag1: "feminino"}, function(err, allClothes){
        if(err){
            console.log(err);
        } else{
            res.render("feminino", {clothes: allClothes});
        }
    })
});

router.get("/:tag2", function(req, res){
    Cloth.find({tag1: "feminino", tag2: req.params.tag2}, function(err, allClothes){
        if(err){
            console.log(err);
        } else{
            res.render("feminino", {clothes: allClothes});
        }
    })
});

module.exports = router;