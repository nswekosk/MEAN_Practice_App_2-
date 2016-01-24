var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var User = require('./models/user');
var app = express();
var ejs = require('ejs');
var engine = require('ejs-mate');
var mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.static(__dirname + '/public'));

mongoose.connect(config.database, function(err){

	if(err){

		console.log(err);
		return;

	}
	console.log("App connected to database");

});

app.post('/create-user', function(req, res, next){

	var user = new User();

	user.profile.name = req.body.name;

	user.password = req.body.password;

	user.email = req.body.email;

	user.save(function(err){
	
		if(err) return next(err);

		res.json("Successfully created a new user");
			
	});

});

app.get('/', function(req, res){

	res.render('main/home');

});

app.get('/about', function(req, res){

	res.render('main/about');

});

app.listen(config.port, function(err){

	if(err) throw err;

	console.log("App is running");

});
