import Company from "../models/company.models.js";

export const registerCompany = async (req, res) => {
    try {
        const { name, description, location, website, logo } = req.body;

        if (!name || !description || !location || !website) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const userID = req.user.userId;
        const existCompany = await Company.findOne({ userId: userID });

        if (existCompany) {
            return res.status(400).json({
                message: "Company already registered",
                success: false,
            });
        }

        const newCompany = await Company.create({
            name,
            description,
            location,
            website,
            logo,
            userId: userID,
        });

        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company: newCompany,
        });

    } catch (err) {
        console.log("Some Error in registering company", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.user.userID;
        const company = await Company.find({
            userId: userId
        });
        if (!company || company.length === 0) {
            return res.status(404).json({
                message: "Company notn found",
                success: false,
            })
        } else {
            return res.status(200).json({
                message: "Company details fetched Successfully",
                success: true,
                company: company
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
        const { name, description, location, website, logo } = req.body;

        if (!name || !description || !location || !website) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const data = {
            name,
            description,
            location,
            website,
            logo
        };

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
        console.log("Error in updating company", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
