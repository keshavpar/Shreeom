const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const MedicinalExamination=new Schema({
    uniqueid:{type:String,default:''},
    Bp:{type:String,default:''},
    Pulse:{type:String,default:''},
    Nadi:{type:String,default:''},
    Jivha:{type:String,default:''},
    time:{type:Date,default:Date.now},
    doctorName:{type:String,default:''},
    capgiven:{type:Int16Array,default:0},
    findings:{type:String,default:''}
})

module.exports=mongoose.model("medicinalExamination",Patients);    