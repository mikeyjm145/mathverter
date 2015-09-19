var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    about: String,
    signupDate: String,
    amountOfNotes: Number,
    amountFavorited: Number,
    amountDeleted: Number,
    notes: [],
    favs: [],
    deleted: []
});

mongoose.model('users', usersSchema);