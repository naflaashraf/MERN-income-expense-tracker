const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    hasAccountCreated: {
        type: Boolean,
        default: false

    },
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }]

}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

const User = mongoose.model("User", Userschema)

module.exports = User