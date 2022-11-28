const express=require("express");
const app=express();
const hbs=require("hbs");
const mongoose=require("mongoose");
const bodyParser=require('body-parser')

const routes=require('./routes/main')

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(express.json())
app.use('/static',express.static("public"))
app.use('',routes)




//template engine
app.set('view engine','hbs') 
app.set("views","views")

mongoose.connect("mongodb://127.0.0.1:27017/JAL")
    .then(() => {
        app.listen(4000, () => {
            console.log('connected to the database,Server is running on port 4000');
        });
    })
    .catch(err => console.error(err));

// app.listen(process.env.PORT | 5556 ,()=>{
//     console.log("server started");
// });