const mongoose=require('mongoose')


const hrContactsSchema= new mongoose.Schema({
    name : {type: String},
    email : {type : String},
    phone : {type :String} ,

    response_status: { 
        type: String, 
        enum: ['positive', 'neutral', 'negative' , 'very positive'], 
        default: 'neutral' 
    },
    last_connected_date: { type: Date },
    follow_up_date: { type: Date }
});

const companySchema=new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    hr_contacts : [hrContactsSchema],
    notes :{
        type : String , 
    },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);