import Job from "../models/job.models.js";
import Company from "../models/company.models.js";

// export const postJob = async (req, res) => {
//     try {
//         const {
//             title,
//             description,
//             company,
//             location,
//             salary,
//             requirements,
//             jobType
//         } = req.body;
//         const userId = req.user.userId;
//         if (!title || !description || !company || !location || !salary || !requirements || !jobType) {
//             return res.status(400).json({
//                 message: "All fields are required",
//                 success: false,
//             });
//         }
//         const job = await Job.create({
//             title,
//             description,
//             company,
//             location,
//             salary,
//             requirements,
//             jobType,
//             created_by: userId
//         })
//         return res.status(201).json({
//             message: "Job posted successfully",
//             success: true,
//             job: job,
//         });

//     } catch (err) {
//         console.log("Error in posting job", err);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false,
//         });
//     }
// }
// in get/api/jobs/all?keyword=react
// the keyword =react is a part of the query string
// so we can access it using req.query.keyword
// import Job from "../models/job.models.js";
// import Company from "../models/company.models.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      requirements,
      jobType
    } = req.body;

    const userId = req.user.userId;

    if (!title || !description || !location || !salary || !requirements || !jobType) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // ✅ Get company for this recruiter
    const company = await Company.findOne({ userId });
    if (!company) {
      return res.status(404).json({
        message: "No company found for this user",
        success: false,
      });
    }

    // ✅ Create job with proper company reference
    const job = await Job.create({
      title,
      description,
      company: company._id,
      location,
      salary,
      requirements,
      jobType,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job,
    });

  } catch (err) {
    console.log("Error in posting job", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// export const postJob = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       location,
//       salary,
//       requirements,
//       jobType
//     } = req.body;

//     const userId = req.user.userId;

//     // ✅ Step 1: Validate inputs
//     if (!title || !description || !location || !salary || !requirements || !jobType) {
//       return res.status(400).json({
//         message: "All fields are required",
//         success: false,
//       });
//     }

//     // ✅ Step 2: Fetch the company created by the recruiter
//     const company = await Company.findOne({ userId });
//     if (!company) {
//       return res.status(404).json({
//         message: "No company found for this user",
//         success: false,
//       });
//     }

//     // ✅ Step 3: Create the job using the actual company ID
//     const job = await Job.create({
//       title,
//       description,
//       company: company._id,
//       location,
//       salary,
//       requirements,
//       jobType,
//       created_by: userId,
//     });

//     // ✅ Step 4: Respond back
//     return res.status(201).json({
//       message: "Job posted successfully",
//       success: true,
//       job,
//     });

//   } catch (err) {
//     console.log("Error in posting job", err);
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };


export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },       // title contains keyword
                { description: { $regex: keyword, $options: "i" } }, // description contains keyword
            ]
        };
const jobs = await Job.find(query)
  .populate({ path: "company" })  // lowercase 'company' matches schema
  .sort({ createdAt: -1 });
 // sort by createdAt in descending order
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            });
        }
        else {
            return res.status(200).json({
                message: "Jobs fetched successfully",
                success: true,
                jobs,
            })
        };

    } catch (error) {
        console.log("Error in getting all jobs", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};


export const getJobById = async (req, res) => {
    try {
        const id = req.params.id;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            })
        } else {
            return res.status(200).json({
                message: "Job details fetched successfully",
                success: true,
                job: job,
            })
        }

    } catch (error) {
        console.log("Error in getting job by id", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

//admin job functions(tract by th admin kitni jobs post ki hai)
// export const adminJob = async (req, res) => {
//   console.log("admin all");

//   try {
//     const adminId = req.user.userId; // Ensure your auth middleware sets req.user.userId

//     if (!adminId) {
//       return res.status(401).json({
//         message: "Unauthorized access",
//         success: false,
//       });
//     }

//     const jobs = await Job.find({ created_by: adminId })
//       .populate({
//         path: 'company'
//       })
//       .sort({ createdAt: -1 }); // Optional sorting if needed

//     if (!jobs || jobs.length === 0) {
//       return res.status(404).json({
//         message: "No jobs found for this admin",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "Jobs fetched successfully",
//       success: true,
//       jobs,
//     });

//   } catch (error) {
//     console.log("Error in admin job", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };
export const adminJob = async (req, res) => {
  console.log("admin all");

  try {
    const adminId = req.user.userId;
console.log("req.user.userId:", req.user?.userId);
    if (!adminId) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }

    const jobs = await Job.find({ created_by: adminId })
      .populate({ path: 'company',select:'name' })
      .sort({ createdAt: -1 });
console.log("Populated Jobs:", JSON.stringify(jobs, null, 2));
    // ✅ Always return success, even if jobs.length === 0
    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      jobs, // could be empty array
    });

  } catch (error) {
    console.log("Error in admin job", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
