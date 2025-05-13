const mongoose = require('mongoose');



const authSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true}
})



const userauth = mongoose.model('userAuth', authSchema);

module.exports = userauth;