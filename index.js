//models
const medicine= require("./models/medicine")
const patient  = require("./models/patients")
const bill = require("./models/Bill")
const sale = require("./models/sale")
const MedicalExamination = require("./models/doctor_examination");


// MedicalExam
// app.get('/medExam',async (req, res) => {
//     try{
//         const results = await MedicalExamination.find();
//         res.status(200).json({
//             status: "Success",
//             data: {
//                 medExams: results
//             }
//         });
//     } catch (error){
//         res.status(400).json({
//             status:"Failed",
//             message: error.message
//         })
//     }
// })


// Medicines
//Getting the Inventory List
// app.get("/medlist",async(req,res)=>{
//     try{
//         const medicinelist=await medicine.find()
//         res.json({success:true,data:medicinelist})
//     }
//     catch(err)
//     {
//         res.status(500).json({data:[],error:err})
//     }
// })

//Updating the Bill values
app.patch('/patientsbillupdate/:id',async(req,res,next)=>{
    try{
        const _id=req.params.id;
        const updates=req.body;
        const options={new:true}
        const result = await patient.findByIdAndUpdate(_id,updates,options)
        result.save()
        res.send(result);
    }
    catch(error){
        console.log(error)
        res.status(500).json({data:[],error:error})

    }
})

//Updating the Sales values
app.patch('/patientsbillupdate/:id',async(req,res,next)=>{
    try{
        const _id=req.params.id;
        const options={new:true}
        const result = await patient.findByIdAndUpdate(_id,updates,options)
        result.save()
        res.send(result);
    }
    catch(error){
        console.log(error)
        res.status(500).json({data:[],error:error})

    }
})


//Posting the inventory 
// app.post("/addmed",async(req,res)=>{
//     try{
//         const addmed = await medicine.create(req.body)
//         await addmed.save()
//         res.json({success:true,data:addmed})
//     }
//     catch(err){
//         res.status(500).json({data:[],error:err})
//     }
// })