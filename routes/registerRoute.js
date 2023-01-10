const router = require('express').Router()
const User = require('../models/user')
const uniqid = require('uniqid')

router.get('/' , (req , res , next)=>{
    res.render('registerPage')
})

router.post('/' , async (req , res , next)=>{
    const {name , email , mobile , password , address} = req.body;
    console.log(req.body)
    const error = {}
    if(name.length <= 1){
        error.name = "Name should atleast be of length 2"
    }
    if(email.length <= 5){
        error.email = "Email size should be greater than 5"
    }
    if(mobile.length != 10){
        error.mobile = "Mobile no. should be of 10 digits"
    }
    if(address.length < 10){
        error.address = "Address can't be less than 10 character"
    }

    if(password.length < 6){
        error.password = "Password should atleast be of 6 characters"
    }

    if(Object.keys(error).length > 0){
        res.render('registerPage' , {error , name , email , password , mobile , address})
    }else{
        var user = await User.findOne({email : email})
        if(user){
            error.message = "Email already registered!"
            res.render('registerPage' , {error  , name , email , password , mobile , address})
        }else{
            const newUser = new User({
                uid : uniqid(),
                name : name , 
                email : email.toLowerCase(),
                address : address, 
                mobile : mobile , 
                password : password
            })
            newUser.save()
            req.session.email = email;
            res.redirect('/')
        }
    }

})


module.exports = router