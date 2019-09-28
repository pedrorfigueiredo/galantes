var express = require("express");
var router = express.Router({mergeParams: true});
var Cloth = require("../models/cloth");

router.get("/", function(req, res){
    Cloth.find({tag1: "Infantil masculino"}, function(err, allClothes){
        if(err){
            console.log(err);
        } else{
            res.render("infMasculino", {clothes: allClothes});
        }
    })
});

module.exports = router;