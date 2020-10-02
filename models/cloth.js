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

module.exports = mongoose.model("Cloth", ClothSchema);