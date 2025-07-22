import Company from "../models/company.models.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    const userID = req.user.userId;

    if (!companyName) {
      return res.status(400).json({ message: "Company name is required.", success: false });
    }

    const existingCompany = await Company.findOne({ name: companyName });
    if (existingCompany) {
      return res.status(400).json({ message: "You can't register same company.", success: false });
    }

    const newCompany = await Company.create({
      name: companyName,
      userId: userID
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company: newCompany,
      success: true
    });
  } catch (error) {
    console.log("Error registering company:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.user.userId;
        const company = await Company.find({
            userId: userId
        });
        if (!company || company.length === 0) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            })
        } else {
            return res.status(200).json({
                message: "Company details fetched Successfully",
                success: true,
                companies: company
            })
        }


    } catch (err) {
        console.log("Error in getting company details", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });

    }
}

export const getCompanyById = async (req, res) => {
    try {
        const id = req.params.id;
        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        } else {
            return res.status(200).json({
                message: "Company details fetched successfully",
                success: true,
                company: company,
            });
        }

    } catch (err) {
        console.log("Error in getting company by id", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}
export const updateCompany = async (req, res) => {
  try {
    const { name, description, location, website } = req.body;
   const logo = req.file ? `/assets/${req.file.filename}` : undefined;

const data = {
  name,
  description,
  location,
  website,
};

if (logo) data.logo = logo;

const company = await Company.findByIdAndUpdate(req.params.id, data, { new: true });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company,
    });
  } catch (err) {
    console.error("Error in updating company", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
