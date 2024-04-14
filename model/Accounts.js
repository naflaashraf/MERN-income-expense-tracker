const mongoose = require('mongoose')

const Accountschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: [
            "Savings",
            "Investment",
            "Checking",
            "Credit Card",
            "Building",
            "School",
            "Project",
            "Utilities",
            "Travel",
            "Personal",
            "Groceries",
            "Entertaiment",
            "Loan",
            "Cash Flow",
            "Uncategorized"
        ],
        required: true
    },
    intialBalance: {
        type: Number,
        default: 0
    },
    transaction: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    notes: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

const Account = mongoose.model("Account", Accountschema)

module.exports = Account;