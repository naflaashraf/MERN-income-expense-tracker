const mongoose = require('mongoose')

const Transactionschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        enum: ["income", "Expenses"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: [
            "Food",
            "Transportation",
            "Entertaiment",
            "Shopping",
            "Utilities",
            "Health",
            "Travel",
            "Education",
            "Personal",
            "Groceries",
            "Uncategorized",
            "Bills",
            "Building"
        ],
        required: true
    },
    color: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    notes: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

const Transaction = mongoose.model("Transaction", Transactionschema)

module.exports = Transaction