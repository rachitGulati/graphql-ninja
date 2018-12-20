const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = Schema({
    name: String,
    genre: String,
    url: String,
    year: String,
    authorId: String,
});

module.exports = mongoose.model("Book", bookSchema);