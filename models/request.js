const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
        rid : String,
        userId : String,
        userName : String,
        userEmail : String,
        userMobile : String,
        userAddress : String,
        reason : String,
        productID : String,
        productTitle : String,
        productPrice : String,
        productImage : String,
        sellerId : String,
        sellerName : String,
        sellerEmail : String,
        sellerMobile : String,
        sellerAddress : String,
        isApproved : Boolean
})

module.exports = mongoose.model('Request' , requestSchema);