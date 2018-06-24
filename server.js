var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
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
app.use(cookieParser());
app.use(session({
	secret:'da illest developer',
	resave:true,
	saveUnitialized:true
}));
app.use (bodyParser.json ({
	   	extended: true,
		limit: '50mb'
	}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

function checkAdmin(req,res,next){
    console.log(req.cookies.login);
    db.get().collection('admin').find().toArray(function(err,result){
        console.log(req.cookies);
        if(req.cookies.login == result[0].login  && req.cookies.password == result[0].password){
            next();	
        }
        else{
            res.redirect('/admin')
        }
    })
}

app.get('/',data.getNews);

app.get('/reservations',function(req,res){
	res.render("reservations.ejs",{});
});
app.get('/about',function(req,res){
	res.render("about-hotel.ejs",{});
});
app.get('/reviews',function(req,res){
	res.render("reviews.ejs",{});
});
app.get('/contacts',function(req,res){
	res.render("contacts.ejs",{});
});
app.get('/rooms',function(req,res){
	res.render("rooms.ejs",{});
});
app.get('/photogallery',data.getPhoto);
app.get('/admin',function(req,res){
	res.render("admin.ejs",{});
});
app.get('/admin/administration',checkAdmin,function(req,res){
	res.render("administration.ejs",{});
});
app.post('/brone',data.setBrone);

app.post('/imgUpload',checkAdmin,data.imgUpload);

app.post('/newsAdd',checkAdmin,data.newsAdd);


app.post('/login',data.login);

app.post('/logOut',function(req,res){
	res.cookie("login","");
	res.cookie("password","");
	res.send({success:false}).end();
})

db.connect('mongodb://localhost:27017/razer',function(err){
	if(err){
		return console.log(err);
	}
	app.listen(8000,function(){
		console.log("server started");
	})
});
