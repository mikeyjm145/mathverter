var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/login', function(req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);

    if (req.query.username.indexOf('@') === -1) {
        users.findOne({'username': req.query.username, 'password': req.query.password}, function (err, user) {
            if (err || user === undefined || user === null) {
                res.send("No User Found");
            } else {
                res.send(user);
            }
        });
    } else {
        users.findOne({ 'email': req.query.username, 'password': req.query.password }, function (err, user) {
            if (err || user === undefined || user === null) {
                res.send("No User Found");
            } else {
                res.send(user);
            }
        });
    }


});

router.post('/signUp', function (req, res) {
    var user = mongoose.model('users', mongoose.model('users').schema);
    var newUser = new user(req.body);

    user.where({ 'email': req.body.email }).count(function(err, count) {
        if (count > 0) {
            res.send("Email is already registered. Please try again.");
            req.connection.destroy();
        } else {
            user.where({ 'username': req.body.username }).count(function(err, count) {
                if (count > 0) {
                    res.send("Username is already taken. Please try again.");
                    req.connection.destroy();
                } else {
                    newUser.save(function (err) {
                        if (err) res.send('Failed to create new user successfully.');
                        res.send("New user created successfully!");
                    });
                }
            });
        }
    });
});

module.exports = router;