const express = require('express')
const {createCompany , getAllCompanies }=require('../controllers/companyController.js');
const router = express.Router();


router.post('/createCompany' ,createCompany);
router.get('/getAll',getAllCompanies);


module.exports=router;

