const Company = require('../models/Company');

const createCompany = async (req,res)=>{
    try{
        const {name , note , hr_contacts} = req.body;
        if(!name || !hr_contacts || hr_contacts.length ===0){
            return res.status(400).json({
                success : false,
                error : 'company name and atleast 1 hr is required'          
            });
        }                                                                                          //validation


        const existingCompany = await Company.findOne({ name: name });
        if (existingCompany) {
            return res.status(409).json({                                                          // dublication handling
                success: false,
                error: 'Duplicate Entry: A company with this name already exists in the system.'
            });
        }


        const newCompany= await Company.create({
            name : name,
            hr_contacts : hr_contacts,
            note : note||""
        })                                                                                         //creating new company in database

        return res.status(201).json({
            success : true ,
            message : 'company registered successfully',
            data : newCompany
        });                                                                       
    }
    catch(err){
        console.log('error saving the company ', err);
        return res.status(500).json({
            success:false,
            error : 'Server error while saving the comapany '
        });
    }
}

module.exports={createCompany};
