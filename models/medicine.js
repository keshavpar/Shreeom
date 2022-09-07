const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const Medicine= new Schema({
    uniqueid:{type:String,default:''},
    name:{type:String,default:''},
    opiumated:{type:Boolean,default:''},
    description:{type:String,default:''},
    batch_no:{type:Number,default:0},
    price:{type:Number,defualt:0},
    cgst:{type:Number,default:0},
    sgst:{type:Number,default:0},
    mfg_date:{type:String,default:Date.now},
    expiry_date:{type:String,default:''},
    quantity:{type:Number,default:0}
})

module.exports=mongoose.model("medicine",Medicine);