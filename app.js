var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user"),
    
var indexRoutes           = require("./routes/index"),
    masculinoRoutes       = require("./routes/masculino"),
    femininoRoutes        = require("./routes/feminino"),
    infMasculinoRoutes    = require("./routes/infMasculino"),
    infFemininoRoutes     = require("./routes/infFeminino"),
    tags                  = require("./tags");

var url = process.env.DATABASEURL || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-sirbp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

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
    res.locals.tags = tags;
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