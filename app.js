var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user"),
    Tags            = require("./models/tags"),
    seedUser        = require("./seedUser"),
    seedTags        = require("./seedTags");
    
var indexRoutes           = require("./routes/index"),
    masculinoRoutes       = require("./routes/masculino"),
    femininoRoutes        = require("./routes/feminino"),
    infMasculinoRoutes    = require("./routes/infMasculino"),
    infFemininoRoutes     = require("./routes/infFeminino");
    // tags                  = require("./tags");

//var url = process.env.DATABASEURL || "mongodb://localhost/clothes_project";
var url = process.env.DATABASEURL || "mongodb+srv://pedrorf27:enem362880@clothesproject-1dbck.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seedUser();
// seedTags();

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

//todo tags
function getTags() {
    let tags = {};
    Tags.find({tag1: "masculino"}, function(err, tagsFound){
        if(err){
            console.log(err);
        } else{
            tags.masculino = tagsFound;
            Tags.find({tag1: "feminino"}, function(err, tagsFound){
                if(err){
                    console.log(err);
                } else{
                    tags.feminino = tagsFound;
                    Tags.find({tag1: "infantil masculino"}, function(err, tagsFound){
                        if(err){
                            console.log(err);
                        } else{
                            tags.infMasculino = tagsFound;
                            Tags.find({tag1: "infantil feminino"}, function(err, tagsFound){
                                if(err){
                                    console.log(err);
                                } else{
                                    tags.infFeminino = tagsFound;
                                    return tags;
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.tags = getTags();
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
