var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var Cloth = require("../models/cloth");
var Tags = require("../models/tags");
var multer = require("multer");
var cloudinary = require("cloudinary");
var middleware = require("../middleware/index");

allTags = require("../initTags");

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
    Cloth.find({}, function(err, allClothes){
        if(err){
            console.log(err);
        } else{
            res.render("landing", {clothes: allClothes});
        }
    })
});

router.get("/login", function(req, res){
    res.render("login",);
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/", 
        failureRedirect: "/login",
    }), function(req, res){
});

router.get("/add", middleware.isLoggedIn, function(req, res){
    res.render("add");
});

// CREATE CLOTH ROUTE
router.post("/", upload.single("image"), middleware.isLoggedIn, function(req, res){
    // Get image from cloudinary
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
        if(err){
            console.log(err.message);
            return res.redirect("back");
        }
        // add cloudinary url for the image to the cloth object under image property
        var image = result.secure_url;
        var imageId = result.public_id
        var title = req.body.title;
        var description = req.body.description;
        var tag1 = req.body.tag1.toLowerCase();
        var tag2 = req.body.tag2.toLowerCase();
        var newCloth = {title:title, description:description, tag1:tag1, tag2:tag2, image:image, imageId: imageId};
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

// DESTROY CLOTH ROUTE
router.delete("/:id", middleware.isLoggedIn, function(req, res){
    Cloth.findByIdAndRemove(req.params.id, function(err, cloth){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("back");
            cloudinary.v2.uploader.destroy(cloth.imageId);
        }
    });
});

//EDIT ROUTE
router.put("/:id", middleware.isLoggedIn, function(req, res){
    newData = {title: req.body.title, tag2: req.body.tag2.toLowerCase()};
    Cloth.findByIdAndUpdate(req.params.id, newData, function(err, tag){
        if(err){
           console.log(err);
            res.render("back");
        } else {
            res.redirect("back");
        }
    });
 });

router.get("/tags", middleware.isLoggedIn, function(req, res){
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
                                    allTags = tags;
                                    res.render("tags", {tags: tags});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

router.post("/tags", middleware.isLoggedIn, function(req, res){
    Tags.findOne({tag1: req.body.tag1.toLowerCase(), tag2: req.body.tag2.toLowerCase()}, function (err, result){
        if (err){
            console.log(err);
        }
        if (!result) {
            console.log("DONE");
            //Create Tag
            const newTag = {tag1: req.body.tag1.toLowerCase(), tag2: req.body.tag2.toLowerCase()};
            Tags.create(newTag, function(err){
                if(err){
                    console.log(err);
                } else{
                    res.redirect("/tags");
                }
            });
        } else{
            console.log("This tag already exists!");
        }
    });
});

router.delete("/tags/:id", middleware.isLoggedIn, function(req, res){
    Tags.findByIdAndRemove(req.params.id, function(err, tag){
        if(err){
            console.log(err);
        } else{
            res.redirect("back");
        }
    });
});

module.exports = router;

