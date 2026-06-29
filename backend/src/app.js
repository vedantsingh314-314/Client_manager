const express = require('express')
const cors=require('cors')

const companyRoutes =require('./routes/companyRoutes.js')
const mailRoutes = require('./routes/mailRoutes');


const app=express();

app.use(cors());
app.use(express.json());

app.get("/health",(req,res)=>{
    res.send("this is healty")
});

app.use('/api/companies',companyRoutes);
app.use('/api/mail',mailRoutes);
module.exports=app;