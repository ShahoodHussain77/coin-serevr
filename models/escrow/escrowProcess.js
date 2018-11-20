const mongoose = require("mongoose")
const Schema = mongoose.Schema


const currency = require("./currenySchema")

const escrowProcess = new Schema({


    // regular ,multi etc
    escrowType: {
        type: String,
        required: true,
        lowercase: true,
    },

    // buyerEmail
    buyerEmail: {
        type: String,
        required: true,
    },

    // seller email
    sellerEmail: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    // BTC etc
    // amountType: [currency],

    // fee paid by 
    paidBy: {
        type: String,
        required: true,
    },

    feePercentage: {
        type: Number,
        required: true,
    },

    message: {
        type: String,
        required: true,
    },
    buyer: {
        type: Boolean,
        required: true,
    },
    seller: {
        type: Boolean,
        required: true,
    }
 
})

const escrow = mongoose.model("escrow", escrowProcess)

module.exports = escrow

