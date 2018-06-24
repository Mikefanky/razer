var db = require('../db');
var ObjectID = require('mongodb').ObjectID;
exports.setBrone = function(brone,cb){
    db.get().collection('brone').insert({
        fio:brone.fio,
        email:brone.email,
        phone:brone.phone,
        country:brone.country,
        people:brone.people,
        number:brone.number
    },function(err,result){
        cb(err,result);
    });
}

exports.imgUpload = function(img,cb){
    db.get().collection('galery').insert({
        img:img
    },function(err,result){
        cb(err,result);
    });
}

exports.newsAdd = function(news,cb){
    db.get().collection('news').insert({
        title:news.title,
        content:news.content,
        time:news.time
    },function(err,result){
        cb(err,result);
    });
}

exports.getNews = function(cb){
    db.get().collection('news').find().toArray(function(err,res){
        cb(err,res);
    })
}

exports.getPhoto = function(cb){
    db.get().collection('galery').find().toArray(function(err,res){
        cb(err,res);
    })
}


exports.login = function(user,cb){
    db.get().collection('admin').find({login:user.login,password:user.password}).toArray(function(err,res){
        cb(err,res);
    })
}