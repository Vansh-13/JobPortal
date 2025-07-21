import { populate } from "dotenv";
import Application from "../models/application.models.js";
import Job from "../models/job.models.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const jobId = req.params.id;
        const { resume } = req.body;

        if (!userId || !jobId || !resume) {
            return res.status(400).json({
                message: "User ID, Job ID, and Resume are required",
                success: false,
            });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }
        const existingApplication = await Application.findOne({
            applicant: userId,
            job: jobId,
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false,
            });
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            resume: resume,
        });
        job.application.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job application submitted successfully",
            success: true,
            application: newApplication,
        });

    } catch (error) {
        console.log("Error in applying for job", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};


export const getApplication = async(req,res)=>{
    try{
        const userID = req.user.userId;
        const applicaions= await Application.find({
           applicant: userID
        }).sort({
            createdAt: -1 // Sort by createdAt in descending order
        }).populate({
            path: 'job',
            option:{
                sort:{
                    createdAt: -1 // Sort by createdAt in descending order
                }
            },
            populate:{
                path: 'company',
                option:{
                    createdAt: -1
                }
            }
        });
        if(!applicaions || applicaions.length === 0){
            return res.status(404).json({
                message: "No applications found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Applications fetched successfully",
            success: true,
            applications: applicaions,
        });

    }catch(error){
        console.log("Error in getting application",error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }

}

export const getApplicats= async(req,res)=>{

    try{
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path: 'application',
            option:{
                sort:{
                    createdAt: -1 // Sort by createdAt in descending order

                }
            },
            populate:{
                path : 'applicant',
            }
        });
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });

        }else{
            return res.status(200).json({
                message: "Applicants fetched successfully",
                success: true,
                applicants: job.application,

            })

        }



    }catch(error){
        console.log("Error in getting applicants", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });

    }
}


export const updateStatus = async (req,res)=>{
    try{
        const {status}=req.body;
        const applicationId = req.params.id;
        if(!status || !applicationId){
            return res.status(400).json({
                message: "Status and Application ID are required",
                success: false,
            });
        }
        else{
            const application = await Application.findById(applicationId);
            if(!application){
                return res.status(404).json({
                    message: "Application not found",
                    success: false,
                });
            }
            application.status = status.toLowerCase();
            await application.save();
            return res.status(200).json({
                message: "Application status updated successfully",
                success: true,
                application: application,
            });
        }


    }catch(error){
        console.log("Error in updating application status", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });

    }
}