var express = require('express');
var router = express.Router();
var REGISTRATIONS = require('../model/registrations');
var endPointUrl = require('../util/config').endPointUrl;

router.post('/register', function(req, res){
    
    var details = req.body;
    details.idUrl = endPointUrl+details.idUrl;
    details.regId = (new Date()).getTime()+Math.floor(Math.random()*100);
    
    REGISTRATIONS.newRegistration(details, function(err, result){
        
        if(err){
            res.send({error : "Registration failed !!!", data:null});
            return;
        }
        res.send({error:null, data:'Registration Successful, Your reference id is '+details.regId});
        
    });
});

router.get('/getAllRegistrations', function(req, res){
    
    REGISTRATIONS.getRegistrations(function(err, result){
        
        if(err){
            res.send({error : "Internal error occurred", data:null});
            return;
        }
        console.log(result);
        res.send({error:null, data:result});
        
    });
});

 

module.exports = router;