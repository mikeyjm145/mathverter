var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.post('/add_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);
    var note = mongoose.model('notes', mongoose.model('notes').schema);
    var newNote = new note(req.body);

    var query = { _id: req.body.user.type};
    users.findByIdAndUpdate(query,
        {$push: {"notes": newNote}},
        {safe: true, upsert: false},
        function(err, user) {
            res.send(err);
        });
});

router.post('/favorite_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);
    var note = mongoose.model('notes', mongoose.model('notes').schema);
    var newNote = new note(req.body);

    var query = { _id: req.body.user.type};
    users.findByIdAndUpdate(query,
        {$push: {"favs": newNote}},
        {safe: true, upsert: false}, function(err, user) {
            res.send(err);
        });
});

router.post('/realEdit_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);
    var note = mongoose.model('notes', mongoose.model('notes').schema);

    var newNote = new note(req.body);

    users.update({'notes._id': newNote._id},
        {'$set': {
            'notes.$.title': newNote.title,
            'notes.$.favored': newNote.favored,
            'notes.$.content': newNote.content,
            'notes.$.recentEditDate': newNote.recentEditDate
        }},
        function(err,model) {
            if(err){
                console.log(err);
            }
        });
    users.update({'favs._id': newNote._id},
        {'$set': {
            'favs.$.title': newNote.title,
            'favs.$.favored': newNote.favored,
            'favs.$.content': newNote.content,
            'favs.$.recentEditDate': newNote.recentEditDate
        }},
        function(err,model) {
            if(err){
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        });
});

router.post('/deleteFavorite_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);
    var note = mongoose.model('notes', mongoose.model('notes').schema);

    var newNote = new note(req.body);
    var query = { _id: req.body.user.type};
    users.findByIdAndUpdate(
        query,
        { $pull: { 'favs': {  _id: newNote._id } } },function(err,model){
            if(err){
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        });

});

router.post('/delete_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);
    var note = mongoose.model('notes', mongoose.model('notes').schema);

    var newNote = new note(req.body);
    var query = { _id: req.body.user.type};

    users.findByIdAndUpdate(query,
        {$push: {"deleted": newNote}},
        {safe: true, upsert: false}, function(err, user) {

        });

    users.findByIdAndUpdate(
        query,
        { $pull: { 'favs': {  _id: newNote._id } } },function(err,model){
            if(err){
                console.log(err);
            }
        });

    users.findByIdAndUpdate(
        query,
        { $pull: { 'notes': {  _id: newNote._id } } },function(err,model){
            if(err){
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        });

});

router.post('/deleteForever_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);
    var note = mongoose.model('notes', mongoose.model('notes').schema);

    var newNote = new note(req.body);
    var query = { _id: req.body.user.type};

    users.findByIdAndUpdate(
        query,
        { $pull: { 'deleted': {  _id: newNote._id } } },function(err,model){
            if(err){
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        });

});


router.post('/restore_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);
    var note = mongoose.model('notes', mongoose.model('notes').schema);

    var newNote = new note(req.body);
    var query = { _id: req.body.user.type};

    users.findByIdAndUpdate(query,
        {$push: {"notes": newNote}},
        {safe: true, upsert: false}, function(err, user) {

        });

    users.findByIdAndUpdate(
        query,
        { $pull: { 'deleted': {  _id: newNote._id } } },function(err,model){
            if(err){
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        });

});

router.post('/edit_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);

    var userQuery = { 'mongoose.Types.ObjectId': req.body.userId };
    var aNote = req.body.note;
    var index = req.body.index;

    users.findOne(req.body.userId,
        function(err, user) {
            //if(err) res.send(err);
            var notes = user.notes;

            user.notes[index].title = aNote.title;
            user.notes[index].content = aNote.content;
            user.notes[index].recentEditDate = aNote.recentEditDate;
            user.markModified('notes');
            user.save(function(err, result) {
                if(err) res.send(err);
                else {res.send(user.notes);}
            });
        }
    );
});

router.get('/get_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);

    var userQuery = { _id: req.query.userId};

    users.find(userQuery,
        function(err, user) {
            res.send(user);
        });

});

router.get('/get_notes', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);

    var query = { _id: req.query.userId };
    users.find(query, function(err, user) {
            if (err) res.send(err);
            res.send(user);
        });

});

module.exports = router;