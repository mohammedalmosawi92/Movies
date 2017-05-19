var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var moviesSchema = new Schema({
    MyMoviesRating: [],
    cast: [],
    screenshot: [String],
    coverImage: String,
    mpa_rating: String,
    synopsis: String,
    genres: [String],
    runtime: Number,
    rating: Number,
    year: Number,
    title: String,
    id: Number,
    review: [],
    poster: String
})
module.exports = mongoose.model("Movies", moviesSchema);