const mongoose = require('mongoose');
const medicine = require('./medicine');
const MedExam = require('./doctor_examination');

const Patients=new mongoose.Schema({     
    uniqueid:{type:String,default:''},
    aadharnumber:{type:String,default:'',uniqueid:true},
    age:{type:Number,default:20},
    name:{type:String,default:''},
    address:{type:String,default:''},
    fathersname:{type:String,default:''},
    occupation:{type:String,default:''},
    // bp:{type:String,default:0},
    // pulse:{type:Number,default:0},
    education:{type:String,default:''},
    city:{type:String,default:''},
    state:{type:String,default:''},
    addictionperiod:{type:String,default:''},
    quantity:{type:String,default:''},
    maritalstatus:{type:String,default:''},
    weight:{type:Number,default:''},
    gender:{type:String,default:'Male'},
    // jivha:{type:String,default:''},
    // Nadi:{type:String,default:''},
    Date:{type:Date,default:Date.now},
    totalcap:{type:Number,default:0},
    captoday:{type:Number,default:0},
    Startdosage:{type:Number,default:0},
    expectedDate:{type:Date,default:Date.now},
    medicinelist:{type:Array,default:[]},
    price:{type:Array,default:[]},
    quantitymed:{type:Array,default:[]},
    phonenumber:{type:Number,default:0},
    medicinalExaminations:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'MedicinalExamination'
        }
    ],
    medicalExaminationData: [{
        Bp:{type:String,default:""},
        Pulse:{type:String,default:""},
        Nadi:{type:String,default:""},
        Jivha:{type:String,default:""},
        time:{type:Date,default:Date.now},
        doctorName:{type:String,default:""},
        capgiven:{type:Number,default:0},
        findings:{type:String,default:""}
    }]
})

Patients.pre('save', async function(next){
    try{
        const ids = await MedExam.insertMany(this.medicalExaminationData);
        this.medicalExaminationData = undefined;
        this.medicinalExaminations = ids;
        return next();
    } catch (error) {
        console.log(error);
        next();
    }
});

module.exports=mongoose.model("patients",Patients);    