var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config/config');
var User = require('./models/user');
var app = express();
var ejs = require('ejs');
var engine = require('ejs-mate');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({

	resave: true,
	saveUninitialized : true,
	secret: config.secretKey,
	store: new MongoStore({ 
		url: config.database,
		autoReconnect: true
	})

}));
app.use(flash());
app.set('view engine', 'ejs');
app.engine('ejs', engine);

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(config.database, function(err){

	if(err){

		console.log(err);
		return;

	}
	console.log("App connected to database");

});

app.listen(config.port, function(err){

	if(err) throw err;

	console.log("App is running");

});
