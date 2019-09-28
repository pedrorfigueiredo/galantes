var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var Cloth = require("../models/cloth");
var multer          = require("multer");
var cloudinary      = require("cloudinary");

//MULTER setup
var storage = multer.diskStorage({
    filename: function(req, file, callback) {
      callback(null, Date.now() + file.originalname);
    }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

//Cloudinary setup
cloudinary.config({ 
    cloud_name: "vista-se",
    api_key: "581682629177743",
    api_secret: "g5hVoX6lMi6aKsBx2K7etCegFwg"
});

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

router.get("/add", function(req, res){
    res.render("add");
});

router.post("/", upload.single("image"), function(req, res){
    // Get image from cloudinary
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
        if(err){
            console.log(err.message);
            return res.redirect("back");
        }
        // add cloudinary url for the image to the cloth object under image property
        var image = result.secure_url;
        // req.body.image_id = result.public_id;
        console.log(result.secure_url);
        var description = req.body.description;
        var tag1 = req.body.tag1;
        var tag2 = req.body.tag2;
        var newCloth = {description:description, tag1:tag1, tag2:tag2, image:image};
        // Create a new cloth and save to DB
        Cloth.create(newCloth, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else{
                res.redirect("/add");
            }
        });
    });
});

module.exports = router;

