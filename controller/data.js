var data = require('../model/data');
var fs = require('fs');
exports.setBrone = function(req,res){
    var brone = {
        fio:req.body.fio,
        email:req.body.email,
        phone:req.body.phone,
        country:req.body.country,
        people:req.body.people,
        number:req.body.number
    }
    data.setBrone(brone,function(err,result){
        if(result)
           return  res.send(result)
        res.send(err);
    })
}

exports.imgUpload = function(req,res){
    var img = req.body.fileName;
    fileSave(req.body.data,img);
    data.imgUpload(img,function(err,reult){
        if(!err)
            return  res.sendStatus(200);
        res.sendStatus(500);
    })
}

exports.newsAdd = function(req,res){
    news = {
        title:req.body.title,
        content:req.body.content,
        time:req.body.time
    }
    data.newsAdd(news,function(err,doc){
        if(!err)
            return  res.sendStatus(200);
        res.sendStatus(500);
    })
}

exports.getNews = function(req,res){
    data.getNews(function(err,result){
        if(!err)
            res.render("index.ejs",{result:result});
    })
}

exports.getPhoto = function(req,res){
    data.getPhoto(function(err,result){
        if(!err)
            res.render("photogallery.ejs",{result:result});
    })
}

exports.login = function(req,res){
    var user = {
        login:req.body.login,
        password:req.body.password
    }
    data.login(user,function(err,result){
        if(result!=""){
            res.cookie("login",result[0].login);
            res.cookie("password",result[0].password);
            res.send({success:true}).end();
        }
        else{
            res.send({success:false}).end();
        }
    })
}

function fileSave(file,name){
    var b64Data = file.split(',')[1];
	var buffer = new Buffer(b64Data,'base64');
	fs.writeFile('./img/'+name,buffer,function(e){
		if(e) console.log.error(e);
    });
}