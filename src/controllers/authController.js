const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const generateToken = userId => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({$or: [{email}, {username}]});
        if (existingUser) {
            return res
                .status(400)
                .json({message: "Username or email already in use"});
        }

        const user = new User({username, email, password});
        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {id: user._id, username: user.username, email: user.email},
        });
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {id: user._id, username: user.username, email: user.email},
        });
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};
