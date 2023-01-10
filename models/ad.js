const mongoose = require('mongoose')

const adSchema = mongoose.Schema({
    aid : {
        type : String
    },
    brand : {
        type : String
    },
    title : {
        type : String
    },
    description : {
        type : String
    },
    price : {
        type : String
    },
    imgUrl : String,
    city : {
        type : String
    },
    sellerId : {
        type : String
    },
    category : {
        type : String
    }
})

module.exports = mongoose.model('Ad' , adSchema)