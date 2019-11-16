var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    Tags = require("./models/tags"),
    seedUser = require("./seedUser"),
    seedTags = require("./seedTags"),
    fs = require('fs'),
    https = require('https');

var indexRoutes = require("./routes/index"),
    masculinoRoutes = require("./routes/masculino"),
    femininoRoutes = require("./routes/feminino"),
    infMasculinoRoutes = require("./routes/infMasculino"),
    infFemininoRoutes = require("./routes/infFeminino");

//var url = process.env.DATABASEURL || "mongodb://localhost/clothes_project";
var url = process.env.DATABASEURL || "mongodb+srv://pedrorf27:enem362880@clothesproject-1dbck.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

seedUser();
// seedTags();

//Passport config
app.use(require("express-session")({
    secret: "150 pages a hour",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.tags = allTags;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use("/", indexRoutes);
app.use("/masculino", masculinoRoutes);
app.use("/feminino", femininoRoutes);
app.use("/infantil-masculino", infMasculinoRoutes);
app.use("/infantil-feminino", infFemininoRoutes);

app.get('*', function (req, res) {
    res.redirect("/");
});

app.listen(21127, function(){
    console.log("Server Started");
});
//test
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(443, function () {
        console.log('Https Server Started')
    })
