var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user"),
    seedUser        = require("./seedUser");
    
var indexRoutes           = require("./routes/index"),
    masculinoRoutes       = require("./routes/masculino"),
    femininoRoutes        = require("./routes/feminino"),
    infMasculinoRoutes    = require("./routes/infMasculino"),
    infFemininoRoutes     = require("./routes/infFeminino");

//var url = process.env.DATABASEURL || "mongodb://localhost/clothes_project";
var url = process.env.DATABASEURL || "mongodb+srv://pedrorf27:enem362880@clothesproject-1dbck.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seedUser();

//Passport config
app.use(require("express-session")({
    secret: "150 pages a hour",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/masculino", masculinoRoutes);
app.use("/feminino", femininoRoutes);
app.use("/infantil-masculino", infMasculinoRoutes);
app.use("/infantil-feminino", infFemininoRoutes);

app.get('*', function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Server Started");
});
