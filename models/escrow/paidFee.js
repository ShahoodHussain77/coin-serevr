const mongoose = require("mongoose")
const Schema = mongoose.Schema


const fee = new Schema({


    feeName: {
        type: String,
        required: true,
    },
    
    isActive: {
        type: Boolean,
    },
    id:{
        
    }
})


export default fee