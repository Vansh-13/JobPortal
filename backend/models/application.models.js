import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'],
        default: 'Applied'
    },
    resume: {
        type: String,
        required: true
    }

},{
    timestamps: true
})
const Application = mongoose.model("Application", applicationSchema);
export default Application;