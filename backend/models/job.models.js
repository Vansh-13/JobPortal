import mongoose from "mongoose";
const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
   jobType: {
  type: String,
  enum: ["Full-time", "Part-time", "Internship", "Remote", "Contract", "Temporary"],
  required: true,
},

    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    application: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }]
}, {
    timestamps: true
})
const Job = mongoose.model("Job", jobSchema);
export default Job;