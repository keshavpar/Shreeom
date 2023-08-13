const mongoose = require('mongoose');
const Patient = require('./../models/patients');

const CustomError = require('./../utils/customError');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');

exports.medicines = asyncErrorHandler( async (req, res, next) => {
    const patient = await Patient.findById(req.params.id);

    if(!patient) {
        const err = new CustomError(`Patient with this id:${req.params.id} not found! :(`, 404);
        return next(err);
    }

    const pipeline = [
        {
            $match: { _id: mongoose.Types.ObjectId(req.params.id) }
        },
        {
            $lookup: {
                from: 'medicines',
                localField: 'medicinelist',
                foreignField: '_id',
                as: 'meds'
            },
        },
        {
            $unwind: '$meds'
        },
        {
            $project: {
                name: '$meds.name',
                opiumated: '$meds.opiumated',
                description: '$meds.description',
                batch_no: '$meds.batch_no',
                price: '$meds.price',
                cgst: '$meds.cgst',
                sgst: '$meds.sgst',
                mfg_date: '$meds.mfg_date',
                expiry_date: '$meds.expiry_date',
                quantity: '$meds.quantity'
            }
        }
    ]

    const medicines = await Patient.aggregate(pipeline);
    res.status(200).json({
        status: "Success",
        No_Of_Meds: patient.medicinelist.length,
        data: {
            Patient: {
                Patient_Name: patient.name,
                FathersName: patient.fathersname,
                Contact: patient.phonenumber
            },
            medicines
        }
    });
})

//Length of medicine
// app.get("/medicinenumber",async(req,res)=>{
//     try{
//         var query = medicine.find();
//         query.count(function(err,count){
//           res.json({data:count})

//         });
//     }
//     catch(err){
//         res.status(500).json({data:[],error:err})
//     }
// })



/* ************************************************************************************** */
// list of Number of all medicines ? 
// [ Qt0, Qt1, ...]

// OR

// Sum of all quantities of medicines 
// [ Qt0 + Qt1 + ... ]

// OR

// Quantity of only specific medicine ( Qti )

// OR

// Total Number of Unique Medicines ( No_Of_Meds: patient.medicinelist.length )
/* *************************************************************************************** */



