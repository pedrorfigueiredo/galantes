var mongoose = require("mongoose");

var ClothSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    tag: String,
    img: {
        data: Buffer, contentType: String
    }
});

module.exports = mongoose.model("Cloth", ClothSchema);