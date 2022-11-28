const express=require('express');
const { route } =require('express/lib/application');
const async=require("hbs/lib/async");
const user=require("../models/Contact")
const register=require("../models/Register")


const routes=express.Router()

routes.get("/",(req,res)=>{
    res.render("index")
})

routes.get("/gallery",(req,res)=>{
    res.render("gallery")
})

// routes.get("/login", (req,res) => {
//     res.render=("html/losi")
// })

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const newUser = await user.signup(email, password)
        // const token = createToken(newUser._id)
        // res.status(200).json({email,newUser})
        res.status(200).redirect("/")
    } catch (err) {
        res.status(404).json({error: err.message})
    }
    // res.json('mssg : user is registered')
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const User = await user.login(email, password)
        // const token = createToken(User._id)
        console.log(User)
        // res.status(200).json({email,User})
        res.status(200).redirect("/")
    } catch (err) {
        res.status(404).json({error: err.message})
    }
    // res.json('mssg : user is logged in')
}

// register user
const registerUser = async (req, res) => {
    const { full_name,email,mobile_number,address,id_type,id_number,plan,date } = req.body
    try {
        const User = await register.register(full_name,email,mobile_number,address,id_type,id_number,plan,date)
        // const token = createToken(User._id)
        // res.status(200).json({full_name,email,mobile_number,address,id_type,id_number,plan,date})
        res.status(200).redirect("/")
    } catch (err) {
        res.status(404).json({error: err.message})
    }
    // res.json('mssg : user is logged in')
}
//parameters

const paramUser = (req,res) => {
    const { pH_value ,TDS,Sulfate,Organic_carbon,Turbidity,Hardness,Chloramines,Conductivity,Trihalomethanes} = req.body
    console.log(pH_value ,TDS,Sulfate,Organic_carbon,Turbidity,Hardness,Chloramines,Conductivity,Trihalomethanes)
    // console.log(req.body)

//writing csv file
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'file.csv',
    header: [
    {id:'pH_value'},{id:'TDS'},{id:'Sulfate'},{id:'Organic_carbon'},{id:'Turbidity'},{id:'Hardness'},{id:'Chloramines'},{id:'Conductivity'},{id:'Trihalomethanes'} ]});
        
        
    const records = [
    req.body
];
 
csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });


//reading csv file
// const csv=require('csv-parser')
// const fs=require('fs')  
// const results=[]

// fs.createReadStream('outputfile.csv')
//     .pipe(csv({}))
//     .on('data',(data)=>results.push(data))
//     .on('end',()=>{
//         alert(results);
//     })





}






routes.post("/signup",signupUser)
routes.post("/param",paramUser)
routes.post("/login",loginUser)
routes.post("/register",registerUser)

module.exports=routes