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
const bill =require("./models/Bill")
const sale=require("./models/sale")
const app =express();
app.use(express.json())

mongoose.connect(process.env.DB_connection_String)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const Port = 8080

app.listen(Port,()=>{
    console.log("Listening to no one "+Port)
})

//Default Page
app.get("/",(req,res)=>{
    res.send("Welcome to Shree Omsheel Ayurvedic Pharmacy and Research Centre")
    res.end()
})

app.get("/patientnumber",async(req,res)=>{
    try{
        var query = patient.find();
        query.count(function(err,count){
          res.json({data:count})

        });
    }
    catch(err){
        res.status(500).json({data:[],error:err})
    }
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

//Updating the Bill values
app.patch('/billupdate/:id',async(req,res,next)=>{
    try{
        const _id=req.params.id;
        const updates=req.body;
        const options={new:true}
        const result = await bill.findByIdAndUpdate(_id,updates,options)
        result.save()
        res.send(result);
    }
    catch(error){
        console.log(error)
        res.status(500).json({data:[],error:error})

    }
})

app.patch('/salesupdate/:id',async(req,res,next)=>{
    try{
        const _id=req.params.id;
        const updates=req.body;
        const options={new:true}
        const result = await sale.findByIdAndUpdate(_id,updates,options)
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

//app get Bill no
app.get("/billno",async(req,res)=>{
    try{
        const billlist=await bill.find()
        res.json({success:true,data:billlist})
    }
    catch(err)
    {
        res.status(500).json({data:[],error:err})
    }
})

app.post("/bill",async(req,res)=>{
    try{
        const addbill=new bill(req.body)
        await addbill.save()
        res.json({success:true,data:addbill})
    }
    catch(err){
        res.status(500).json({data:[],error:err})
    }
})
//app get Sales
app.get("/sales",async(req,res)=>{
    try{
        const saleslist=await sale.find()
        res.json({success:true,data:saleslist})
    }
    catch(err)
    {
        res.status(500).json({data:[],error:err})
    }
})
app.post("/sale",async(req,res)=>{
    try{
        const addsales=new sale(req.body)
        await addsales.save()
        res.json({success:true,data:addsales})
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
//Length of medicine

app.get("/medicinenumber",async(req,res)=>{
    try{
        var query = medicine.find();
        query.count(function(err,count){
          res.json({data:count})

        });
    }
    catch(err){
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

