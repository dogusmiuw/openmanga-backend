const User = require("../models/User");

exports.getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({message: "User not found"});

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        let {page = 1, limit = 20} = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (limit > 20) limit = 20;

        const skip = (page - 1) * limit;

        const users = await User.find()
            .select("-password")
            .skip(skip)
            .limit(limit);

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            page,
            limit,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
            users,
        });
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.updateMyProfile = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) updateData.password = password;

        const user = await User.findByIdAndUpdate(req.user.id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!user) return res.status(404).json({message: "User not found"});

        res.status(200).json({
            message: "Profile updated successfully",
            user: {id: user._id, username: user.username, email: user.email},
        });
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.deleteMyAccount = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {isActive: false});
        res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.deactivateUser = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findByIdAndUpdate(
            id,
            {isActive: false},
            {new: true},
        ).select("-password");

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({
            message: "User deactivated successfully",
            user,
        });
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};
