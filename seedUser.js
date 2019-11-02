var mongoose = require("mongoose");
var User = require("./models/user");

function seedUser(){
    var newUser = new User({username: "vistase"});
    User.register(newUser, "230417valentina", function(err, user){
        if(err){
            console.log(err.message);
            return res.render("/");
        }
        passport.authenticate("local")(req, res, function(){
            console.log("User Registered");
        });
    });
}

module.exports = seedUser;