import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const crossSite = process.env.CROSS_SITE_COOKIES === "true";
const isProd = process.env.NODE_ENV === "production";
const cookieOptions = {
    httpOnly: true,
    secure: crossSite || isProd,
    sameSite: crossSite ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        if (!fullname || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match!" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exist!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullname,
            username,
            password: hashedPassword,
            gender
        })
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect Username or Password",
                success: false
            })
        }
        const doesPasswordMatch = await bcrypt.compare(password, user.password)
        if (!doesPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect Username or Password",
                success: false
            })
        }
        const tokenData = {
            userID: user._id
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

        return res.status(200).cookie("token", token, cookieOptions).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname
        })

    } catch (error) {
        console.log(error)
    }
}

export const logout = (req, res) => {
    try {
        const { maxAge, ...clearOptions } = cookieOptions;
        return res.status(200).clearCookie("token", clearOptions).json({
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(error);

    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        return res.status(200).json(otherUsers)
    } catch (error) {
        console.log(error)
    }
}