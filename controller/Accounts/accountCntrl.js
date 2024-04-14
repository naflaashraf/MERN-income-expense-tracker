const Account = require('../../model/Accounts');
const User = require('../../model/Users');

const createAccountCtrl = async (req, res) => {
    const { name, accountType, intialBalance, notes } = req.body
    try {
        // find user Logged in

        const userFound = await User.findById(req.user)
        if (!userFound) {
            return res.json({
                status: 'fail',
                message: 'Not loggied in'
            })
        }

        //create Account
        const account = await Account.create({
            name,
            accountType,
            intialBalance,
            notes,
            createdBy: req.user
        });
        //push account 
        userFound.accounts.push(account._id);
        // save user
        await userFound.save()
        res.json({
            status: 'success',
            data: account
        })
    } catch (error) {
        console.log(error);
    }
}
const getsingleAccountCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const account = await Account.findById(id).populate("transaction")
        console.log(account);
        return res.json({
            status: 'success',
            data: account
        })
    } catch (error) {
        console.log(error);
    }
}
const getallAccountCtrl = async (req, res) => {
    try {
        const accounts = await Account.find().populate("transaction")
        res.json(accounts)
    } catch (error) {
        console.log(error);
    }
}

const updateAccountCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const account = await Account.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        }); res.json({
            status: 'success',
            data: account
        })
    } catch (error) {
        console.log(error);
    }
}
const deleteAcountCtrl = async (req, res) => {
    try {
        const { id } = req.params
        await Account.findByIdAndDelete(id)
        res.json({
            status: "Success",
            data: null
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    createAccountCtrl,
    getsingleAccountCtrl,
    getallAccountCtrl,
    deleteAcountCtrl,
    updateAccountCtrl
}