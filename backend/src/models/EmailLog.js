const mongoose = require('mongoose');


const emailLogSchema = mongoose.Schema({
    hr_contact_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },

    tracking_id: { type: String, required: true, unique: true },

    status: { 
        type: String, 
        enum: ['scheduled', 'sent', 'opened', 'failed'], 
        default: 'sent' 
    },
    send_at: { type: Date }, // For emails scheduled for 9:30 AM
    opened_at: { type: Date },
    sent_at: { type: Date, default: Date.now }
});

module.exports=mongoose.model('emailLog',emailLogSchema);
