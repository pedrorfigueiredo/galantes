var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/", 
        failureRedirect: "/login",
    }), function(req, res){
});

module.exports = router;

