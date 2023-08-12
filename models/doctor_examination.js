const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const MedicinalExamination= new Schema({
    Bp:{type:String,default:""},
    Pulse:{type:String,default:""},
    Nadi:{type:String,default:""},
    Jivha:{type:String,default:""},
    time:{type:Date,default:Date.now},
    doctorName:{type:String,default:""},
    capgiven:{type:Number,default:0},
    findings:{type:String,default:""}
})

module.exports=mongoose.model("MedicinalExamination",MedicinalExamination);    