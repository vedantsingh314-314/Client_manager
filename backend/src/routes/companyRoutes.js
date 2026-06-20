const express = require('express')
const {createCompany}=require('../controllers/companyController.js');
const router = express.Router();


router.post('/createCompany' ,createCompany);


module.exports=router;

