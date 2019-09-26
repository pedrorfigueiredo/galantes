var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    multer          = require("multer"),
    cloudinary      = require("cloudinary"),
    User            = require("./models/user"),
    seedUser        = require("./seedUser");
    
//TODO requiring routes...
var indexRoutes           = require("./routes/index"),
    masculinoRoutes       = require("./routes/masculino"),
    femininoRoutes        = require("./routes/feminino"),
    infMasculinoRoutes    = require("./routes/infMasculino"),
    infFemininoRoutes     = require("./routes/infFeminino");

//MULTER setup
var storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname);
    }
});
var imageFilter = function(req, file, cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};
var upload = multer({storage: storage, fileFilter: imageFilter});

//Cloudinary setup
cloudinary.config({
    cloud_name: "vista-se",
    api_key: "581682629177743",
    api_secret: "g5hVoX6lMi6aKsBx2K7etCegFwg"
});

//var url = process.env.DATABASEURL || "mongodb://localhost/clothes_project";
var url = process.env.DATABASEURL || "mongodb+srv://pedrorf27:enem362880@clothesproject-1dbck.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

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

app.use("/", indexRoutes);
app.use("/masculino", masculinoRoutes);
app.use("/feminino", femininoRoutes);
app.use("/infantil-masculino", infMasculinoRoutes);
app.use("/infantil-feminino", infFemininoRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Server Started");
});
