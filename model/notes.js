var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notesSchema = new Schema({
        title: String,
        content: String,
        creator: String,
        creationDate: String,
        recentEditDate: String,
        favored: Boolean,
        user: {
            type: Schema.ObjectId,
            ref: 'users'
        }
});

mongoose.model('notes', notesSchema);