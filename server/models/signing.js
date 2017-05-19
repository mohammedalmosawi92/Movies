var mongoose = require("mongoose");
var Scehma = mongoose.Schema;

var userSchema = new Scehma({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    privilege: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    favorite: []
})

module.exports = mongoose.model("User", userSchema);