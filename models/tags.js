var mongoose = require("mongoose");

var TagsSchema = new mongoose.Schema ({
    tag1: String,
    tag2: String
});

module.exports = mongoose.model("Tags", TagsSchema);