import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    description:{
        type: String,
        
    },
    location:{
        type: String,
        
    },
    website:{
        type: String,
      
    },
    logo:{
        type: String,
        default: ""
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})
const Company = mongoose.model("Company", companySchema);
export default Company;