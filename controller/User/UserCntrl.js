const User = require("../../model/Users");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { model } = require("mongoose");
const UserRegister = async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        //check email is exist
        const userFound = await User.findOne({ email })
        if (userFound) return res.json({ message: "User already exist" })
        // missing field
        if (!fullname || !email || !password) return res.json({ message: "Please fill all the data" })
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        //create user 
        const user = await User.create({
            fullname,
            email,
            password: hashPassword
        })
        res.json({
            status: 'success',
            fullname: user.fullname,
            id: user._id
        })
    } catch (error) {
        console.log(error);
    }

}
const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        //email.exist
        const userFound = await User.findOne({ email })
        if (!userFound) return res.json({
            message: "Invalid login Credentals"
        })
        const isPasswordMAtch = await bcrypt.compare(password, userFound.password)
        if (!isPasswordMAtch) return res.json({
            message: "Invalid login Credentals"
        })


        res.json({
            status: "success",
            fullname: userFound.fullname,
            id: userFound._id,
            token: generateToken(userFound._id)
        })
    } catch (error) {
        console.log(error);
    }

}
const UserProfile = async (req, res) => {
    console.log(req.user);

    try {
        const user = await User.findById(req.user).populate({
            path: "accounts",
            populate: {
                path: "transaction",
                model: "Transaction"
            }

        })
        res.json(user)
    } catch (error) {
        console.log(error);
    }

}
const UserUpdate = async (req, res) => {
    try {
        //check email already exst
        if (req.body.email) {
            const userFound = await User.findOne({ email: req.body.email })
            if (userFound) return res.json({
                status: "fail",
                message: "email already taken"
            })

        }
        //new password hash
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            const user = await User.findByIdAndUpdate(req.user, {
                password: hashPassword
            }, {
                new: true,
                runValidators: true
            }); return res.json({
                status: "success",
                data: user
            })
        }

        const user = await User.findByIdAndUpdate(req.user, req.body, {
            runValidators: true,
            new: true
        })
        return res.json({
            status: "success",
            data: user
        })
    } catch (error) {
        console.log(error);
    }

}
const UserDelete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user)
        res.json({
            status: "success",
            data: null
        })

    } catch (error) {
        console.log(error);
    }

}
module.exports = {
    UserRegister,
    UserLogin,
    UserProfile,
    UserUpdate,
    UserDelete
}