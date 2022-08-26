const express =require("express")
const mongoose =require("mongoose")
require("dotenv/config")
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
//models
const medicine= require("./models/medicine")
const patient  = require("./models/patients")


const app =express();
app.use(express.json())

mongoose.connect(process.env.DB_connection_String)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const Port = 5000

app.listen(Port, '0.0.0.0',()=>{
    console.log("Listening to no one "+Port)
})

//Default Page
app.get("/",(req,res)=>{
    res.send("Welcome to Shree Omsheel Ayurvedic Pharmacy and Research Centre")
    res.end()
})

//Getting the Patients list
app.get("/patientlist",async(req,res)=>{
    try{
        const Patients= await patient.find()
        res.json({success:true,data:Patients})
    }
    catch(err){
        res.status(500).json({data:[],error:err})
    }
})

//Getting the Inventory List
app.get("/medlist",async(req,res)=>{
    try{
        const medicinelist=await medicine.find()
        res.json({success:true,data:medicinelist})
    }
    catch(err)
    {
        res.status(500).json({data:[],error:err})
    }
})

//Posting the inventory 
app.post("/addmed",async(req,res)=>{
    try{
        const addmed=new medicine(req.body)
        await addmed.save()
        res.json({success:true,data:addmed})
    }
    catch(err){
        res.status(500).json({data:[],error:err})
    }
})


//Posting the patients 
app.post("/adduser",async(req,res)=>{
    try{
        const addpatient= new patient(req.body)
        await addpatient.save()
        res.json({success:true,data:addpatient})
    }
    catch(err){
        res.status(500).json({data:[],error:err})
    }
})


// //Updating the patients
app.put("/update")



//Deleting the patient using id
app.delete("/delpatient/:id",async(req,res)=>{
    console.log(req.params.id)
    try{
        
        patient.remove({_id:req.params.id}).
    then(result=>{res.status(200).json({message:'patient record Deleted',result:result  })})
    }catch(err){
        res.status(500).json({error:err})}{

    }
})

