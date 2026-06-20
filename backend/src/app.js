const express = require('express')
const cors=require('cors')

const companyRoutes=require('./routes/companyRoutes.js')

const app=express();

app.use(cors());
app.use(express.json());

app.get("/health",(req,res)=>{
    res.send("this is healty")
});

app.use('/api/companies',companyRoutes);

module.exports=app;