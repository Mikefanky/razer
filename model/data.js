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