const { v4: uuidv4 } = require('uuid');
const Company = require('../models/Company');
const EmailLog = require('../models/EmailLog');
const { sendCustomEmail } = require('../services/mailService');

const sendMailToCompany = async (req,res)=>{
    try {
        const {companyId} = req.body;
        if (!companyId) {
            return res.status(400).json({ success: false, error: 'Company ID is required.' });
        }
        const company=await company.findById(companyId);
        if(!company){
            return res.status(400).json({success: false, error : 'Company not found'});
        }
        if(!company.hr_contacts || company.hr_contacts.length===0){
            return res.status(401).json({success : false , error : 'No HR found in the list'});
        }
        

        let successfulSends=0;
        for(let hr of company.hr_contacts){
            const trackingId = uuidv4(); // tracking 
            const isSent = await sendCustomEmail(hr.email, company.name, trackingId);

            if(isent){
                await EmailLog.create({
                    hr_contact_id: hr._id,
                    company_id: company._id,
                    tracking_id: trackingId,
                    status: 'sent'
                });
                hr.last_connected_date=new Date();
                successfulSends++;
            }

            await company.save();

            return res.status(200).json({
            success: true,
            message: `Successfully sent ${successfulSends} emails to ${company.name}.`
        });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message :'server error while sending the mail'
        });
    }

};
module.exports = {sendMailToCompany};
