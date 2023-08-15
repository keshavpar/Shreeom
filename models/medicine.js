const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const medicine = new Schema({
    name: {
        type:String,
        required: [true, 'Enter the medicine Name'],
        default:'',
        // unique: true
    },
    opiumated: {
        type:Boolean,
        default:false
    },
    description: {
        type:String,
        default:''
    },
    batch_no: {
        type:Number,
        default:0
    },
    price: {
        type:Number,
        defualt:0
    },
    cgst: {
        type:Number,
        default:0
    },
    sgst: {
        type:Number,
        default:0
    },
    mfg_date: {
        type:String,
        default:Date.now
    },
    expiry_date: {
        type:String,
        default:''
    },
    quantity: {
        type:Number,
        default:0
    }
})

module.exports=mongoose.model("Medicine",medicine);