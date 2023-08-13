const Patient = require('./../models/patients');
const aysncErrorHandler = require('./../utils/asyncErrorHandler');
const CustomError = require('./../utils/customError');

exports.countAllPatients = aysncErrorHandler(async(req, res, next)=>{ // "/patientnumber"

    const count = await Patient.countDocuments({});

    res.status(200).json({
        status: "Success",
        data: {
            Count: count
        }
    });

})

//Get Today Patient List
exports.todayPatientList = aysncErrorHandler (async (req, res, next)=>{ // "/todaypat"

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight 
    // For Ex: Today is 23rd So all patients within Date : 23 - time: 12:00AM <=> Date: 24 - time: 12:00AM
    const nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const todaysPatients = await Patient.find({ Date: { $gte: today, $lt: nextDay } })
        // .sort({ Date: -1 }); // For newest Patients at the top

    res.status(200).json({
        staus: "Success",
        data: {
            patients: todaysPatients
        }
    });
})

exports.patientListPdf = aysncErrorHandler( async(req, res, next)=>{ // "/patientlistpdf"
    
    const patients = await Patient.find({}).select('-_id name address state Date phonenumber');
    
    res.status(200).json({
        status: "Success",
        data: {
            patients
        }
    });
})

//Getting the Patients list
exports.patientList = aysncErrorHandler( async(req, res, next)=>{ // "/patientlist"
    
    const patients = await Patient.find({})
        .sort({ Date: -1 }) // Sort by Date in descending order (most recent first)
        // select('-_id name address state Date phonenumber') // Specify the fields you want to include in the result
        // '-' before the field name means exclude 
    res.status(200).json({
        status: "Success",
        data: {
            patients
        }
    });
    
})

//Posting the patients 
exports.addPatient = aysncErrorHandler( async(req, res, next)=>{ // "/addpatient"

    const addpatient = await Patient.create(req.body);

    res.status(201).json({
        status: "Success",
        data: {
            addpatient
        }
    });

})

//Deleting the patient using id
exports.deletePatient = aysncErrorHandler( async(req, res, next)=>{  // "/delpatient/:id"
    
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if(!deletedPatient){
        const err = new CustomError('Patent with that ID is not found!', 404);
        return next(err);
    }

    res.status(204).json({
        status: "Success",
        data: null
    });  

    // ???
    // As deleting a patient,
    // the medicines and medicalExams should also be deleted simaltaneously related to that patient
})