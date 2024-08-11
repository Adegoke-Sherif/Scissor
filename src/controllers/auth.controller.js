import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ErrorWithStatus } from "../middlewares/errorHandler.js";
import USER from "../model/user.schema.js";

export const registerUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await USER.findOne({ email });
        if (existingUser) {
          throw new ErrorWithStatus("User already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new USER({ email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "User Login successfully",  token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await USER.findById(req.user._id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
