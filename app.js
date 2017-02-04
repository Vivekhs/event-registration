var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var formidable = require('formidable');


var config = require('./util/config');
var login = require('./routes/login');
var registration = require('./routes/registration');

var connectionString = config.connectionString;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next){
    if(mongoose.connection.readyState != 1){
       mongoose.connect(connectionString, function(err){
           if(err){
               console.log('Error occurred while connecting to db');
               throw err;
           }
           else{
               console.log('Connection is ready...');
           }
           next();
       });
    }
    else{
        next();
    }



});

app.use(session({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


app.use(express.static(path.join(__dirname, 'public')));



app.use('/', login);
app.use('/', registration);
app.get('/*', function(req, res){
        res.render('index.html') ;
});

app.post('/upload',function(req,res){
        var form = new formidable.IncomingForm();
        form.uploadDir = __dirname +'/public/uploads';
        var filePath ='/uploads/';
        form.parse(req, function(err, fields, files) {
        });
     
        form.on('fileBegin', function(name, file){
            file.path = form.uploadDir + "/" + file.name;
            filePath = filePath+file.name;
        });
        form.on('end', function(){
            res.send(filePath);
        });
    });



app.set('port', process.env.PORT || 4050);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
