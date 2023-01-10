const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    uid : {
        type : String
    },
    name : {
        type : String
    },
    email : {
        type : String
    },
    about :{
        type : String
    },
    mobile : {
        type : String
    },
    address : {
        type : String
    }
    ,
    password : {
        type : String
    }
})

module.exports = mongoose.model('User' , userSchema);