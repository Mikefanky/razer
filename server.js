var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
// var userController = require('./controller/user');
var data = require('./controller/data');
var admin = require('./controller/admin');
var db = require('./db');
app.use(express.static(__dirname));
app.use (bodyParser.urlencoded ({
   	extended: true,
	limit: '50mb'
}));

app.use (bodyParser.json ({
	   	extended: true,
		limit: '50mb'
	}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/',function(req,res){
	res.render("index.ejs",{});
});

app.get('/reservations',function(req,res){
	res.render("reservations.ejs",{});
});
app.get('/photogallery',function(req,res){
	res.render("photogallery.ejs",{});
});
app.post('/brone',data.setBrone);

// db.connect('mongodb://localhost:27017/razer',function(err){
// 	if(err){
// 		return console.log(err);
// 	}
	app.listen(8000,function(){
		console.log("server started");
	})
// });