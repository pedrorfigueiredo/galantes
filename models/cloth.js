<<<<<<< HEAD
var mongoose = require("mongoose");

var ClothSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    description: String,
    tag1: String,
    tag2: String,
    image: String,
    imageId: String
});

=======
var mongoose = require("mongoose");

var ClothSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    title: String,
    description: String,
    tag1: String,
    tag2: String,
    image: String,
    imageId: String
});

>>>>>>> 9b52bc9d29036fb0ab8fc1e5e0d39cef5f46a069
module.exports = mongoose.model("Cloth", ClothSchema);