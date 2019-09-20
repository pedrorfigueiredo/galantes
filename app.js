var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override");

//TODO requiring routes...

var url = process.env.DATABASEURL || "mongodb://localhost/clothes_project";
mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//TODO seedDB();

//TODO Passport config

app.get("/", function(req, res){
    res.render("landing");
})

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Server Started");
});
