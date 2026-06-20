const dns=require('dns');
dns.setServers(['8.8.8.8' , '8.8.4.4']);


const app=require('./src/app.js');
const { connect } = require('mongoose');


require('dotenv').config();
const connectDB= require('./src/config/db.js');


const PORT=process.env.PORT || 8000;

connectDB();

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})


