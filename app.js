var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileSystem = require('fs');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var notes = require('./routes/notes');
var mathConverter = require('./routes/mathConverter');
var html2canvas = require('./node_modules/html2canvas/dist/html2canvas.js');
var mathFormulaToImage = require('./routes/mathFormulaImageConversion');

//https://www.npmjs.com/package/sha1
//https://thinkster.io/mean-stack-tutorial/
//http://www.sha1-online.com/ Already installed via npm
//mongodb://admin:password@ds049631.mongolab.com:49631/mathverter
mongoose.connect('mongodb://admin:password@ds061158.mongolab.com:61158/airpad', function (err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

//load all files
fileSystem.readdirSync(__dirname + '/model').forEach(function(fileName) {
    require(__dirname + '/model/' + fileName);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public/stylesheets'));
app.use(express.static(__dirname + '/public/javascripts'));
app.use(express.static(__dirname + '/public/htmls'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/model'));

app.use('/', routes);
app.use('/users', users);
app.use('/notes', notes);
app.use('/convert', mathConverter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
var errorMessage;
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
		errorMessage = err.message;
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
