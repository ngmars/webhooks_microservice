"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username:{
        type:String,
        lowercase:true,
        required:'Please fill in your userId!',
        unique:true
    },
    role:{
        type:String,
        lowercase:true,
        required:'Please fill in your userId!',
    },
    password:{
        type:String,
        required:true
    }

})


module.exports = mongoose.model("User", UserSchema);