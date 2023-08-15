const mongoose = require('mongoose');
const Patient = require('./../models/patients');

const CustomError = require('./../utils/customError');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');

exports.medExam = asyncErrorHandler( async (req, res, next) => {
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
                from: 'medicalexams',
                localField: 'medicalExams',
                foreignField: '_id',
                as: 'medExams'
            },
        },
        {
            $unwind: '$medExams'
        },
        {
            $project: {
                Bp: '$medExams.Pp',
                Pulse: '$medExams.Pulse',
                Nadi: '$medExams.Nadi',
                Jivha: '$medExams.Jivha',
                time: '$medExams.time',
                doctorName: '$medExams.doctorName',
                capgiven: '$medExams.capgiven',
                findings: '$medExams.findings'
            }
        }
    ]

    const medicalExams = await Patient.aggregate(pipeline);
    res.status(200).json({
        status: "Success",
        No_Of_Exams: patient.medicalExams.length,
        data: {
            Patient: {
                Patient_Name: patient.name,
                FathersName: patient.fathersname,
                Contact: patient.phonenumber,
            },
            medicalExams
        }
    });
})