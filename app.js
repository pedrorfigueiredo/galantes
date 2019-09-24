var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user");
    seedUser        = require("./seedUser");

//TODO requiring routes...

var url = process.env.DATABASEURL || "mongodb://localhost/clothes_project";
mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//TODO seedDB();
// seedUser();

//Passport config
app.use(require("express-session")({
    secret: "Once again Rusy wins cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/masculino", function(req, res){
    res.render("masculino");
});

app.get("/feminino", function(req, res){
    res.render("feminino");
});

app.get("/infantil-masculino", function(req, res){
    res.render("infMasculino");
});

app.get("/infantil-feminino", function(req, res){
    res.render("infFeminino");
});

app.get("/editar", function(req, res){
    res.render("editar");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Server Started");
});
