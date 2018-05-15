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