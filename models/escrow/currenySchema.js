const mongoose = require("mongoose")
const Schema = mongoose.Schema


const currencySchema = new Schema({


    currencyName: {
        type: String,
        required: true,
    },

    currencyShort: {
        type: String,
        required: true,
    },

    isActive: {
        type: Boolean,
    },
    currencyId: {
        type: String,
    }
})

const currency = mongoose.model("currency", currencySchema)
module.exports = currency