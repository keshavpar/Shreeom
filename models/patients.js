const mongoose = require('mongoose');
const medicine = require('./medicine');
const Schema = mongoose.Schema

const Patients=new Schema({
    uniqueid:{type:String,default:''},
    aadharnumber:{type:String,default:''},
    name:{type:String,default:''},
    address:{type:String,default:''},
    fathersname:{type:String,default:''},
    occupation:{type:String,default:''},
    bp:{type:String,default:0},
    pulse:{type:Number,default:0},
    education:{type:String,default:''},
    city:{type:String,default:''},
    state:{type:String,default:''},
    addictionperiod:{type:String,default:''},
    quantity:{type:String,default:''},
    maritalstatus:{type:String,default:''},
    weight:{type:Number,default:''},
    gender:{type:String,default:'Male'},
    jivha:{type:String,default:''},
    Nadi:{type:String,default:''},
    Date:{type:Date,default:Date.now},
    expectedDate:{type:Date,default:Date.now},
    medicinelist:{type:Array,default:[]},
    price:{type:Array,default:[]},
    quantitymed:{type:Array,default:[]},
    phonenumber:{type:Number,default:0}
    })

    module.exports=mongoose.model("patients",Patients);    