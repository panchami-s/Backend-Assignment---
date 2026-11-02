const {
    createProfile,
    findProfile,
    updateProfile,
    deleteProfile
} = require("../models/profileModel");

const create = async (req, res) => {
    try {
        const userId = req.user._id;

        const existing = await findProfile(userId);

        if (existing) {
            return res.status(409).json({
                message: "Profile already exists"
            });
        }

        const profile = {
            userId,
            skills: [],
            qualifications: [],
            resume: null,
            createdAt: new Date()
        };

        await createProfile(profile);

        res.status(201).json({
            message: "Profile created successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


const getProfile = async (req, res) => {
    try {
        const profile = await findProfile(req.user._id);

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json(profile);

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


const update = async (req, res) => {
    try {
        const userId = req.user._id;

        const profile = await findProfile(userId);

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        await updateProfile(userId, req.body);

        res.status(200).json({
            message: "Profile updated successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
    create,
    getProfile,
    update,
};
