const mongoose =require('mongoose')
const schema =mongoose.Schema

const Bill = new schema({
    billnopiumated:{type:Number,default:0},
    billnotopiumated:{type:Number,default:0}
})

module.exports=mongoose.model("Bill",Bill);