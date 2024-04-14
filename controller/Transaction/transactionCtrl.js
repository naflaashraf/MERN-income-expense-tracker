const Account = require("../../model/Accounts");
const Transaction = require("../../model/Transactions");
const User = require("../../model/Users");

const createtransactionCtrl = async (req, res) => {
    const { account, name, transactionType, amount, category, notes } = req.body
    try {
        //find the user 
        const userFound = await User.findById(req.user)
        if (!userFound) {
            return res.json({
                status: 'failed',
                message: "not logged in"
            })

        }
        //find the account
        const accountFound = await Account.findById(account)
        if (!accountFound) {
            return res.json({
                status: 'failed',
                message: "no account"
            })

        }
        //create transaction
        const transaction = await Transaction.create({
            name,
            transactionType,
            amount,
            category,
            createdBy: req.user,
            notes,
            account
        })
        //push transaction
        accountFound.transaction.push(transaction._id)
        //resave the account
        await accountFound.save()
        res.json({
            status: 'success',
            data: transaction
        });
    } catch (error) {
        console.log(error);
    }
}
const getAllTransactionCtrl = async (req, res) => {
    try {
        const trans = await Transaction.find()
        res.json({
            status: "Success",
            data: trans
        });
    } catch (error) {
        console.log(error);
    }
}
const getSingleTransactionCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const trans = await Transaction.findById(id)
        res.json({
            status: "Success",
            data: trans
        });

    } catch (error) {
        console.log(error);
    }
}
const updateTransactionCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const trans = await Transaction.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        res.json({
            status: "Success",
            data: trans
        });
    } catch (error) {
        console.log(error);
    }
}
const deleteTransactionCtrl = async (req, res) => {
    try {
        const { id } = req.params
        await Transaction.findByIdAndDelete(id)
        res.json({
            status: "Success",
            data: null
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    createtransactionCtrl,
    getAllTransactionCtrl,
    getSingleTransactionCtrl,
    updateTransactionCtrl,
    deleteTransactionCtrl
}