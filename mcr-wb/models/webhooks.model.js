"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let webhookSchema = new Schema({
    webhook:{
        type:String,
        required:'Please fill in your webhook!',
        unique:true
    },
})


module.exports = mongoose.model("Webhook", webhookSchema);

