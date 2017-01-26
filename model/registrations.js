var mongoose = require('mongoose');
var regSchema = new mongoose.Schema({
    regId: {type:String, unique:true},
    fullName : String,
    mobile : String,
    email : String,
    idUrl : String,
    type : String,
    tickets : Number,
    registrationDate : Date
});

regSchema.statics.newRegistration = function(regDetails, callback){
        regDetails.registrationDate = new Date();
        this.create(regDetails, function(err, result){
                        if(err){
                            console.log(err);
                            callback(err, null);
                        }
                        else{
                            callback(null, result);
                        }
        });

}

regSchema.statics.getRegistrations = function(callback){
            this.find({}, {_id:0, _v:0}, function(err, result){
                if(err) {
                    console.log(err);
                    callback(err, null);
                }
                else{
                    console.log(result);
                    callback(null, result);
                }
            });
}

module.exports = mongoose.model('registrations', regSchema);
