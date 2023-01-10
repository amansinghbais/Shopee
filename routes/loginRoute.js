const router = require('express').Router()
const User = require('../models/user')


router.get('/' ,(req , res , next)=>{
    res.render('loginPage')
})

router.post('/' , async (req , res , next)=>{
    var {email , password} = req.body
    email = email.toLowerCase()
    var user = await User.findOne({email})
    if(user == null){
        res.render('loginPage' , {message : "Email not registered!" , email})
    }else{
        if(user.password === password){
            console.log("authenticated")
            req.session.email = email;
            res.redirect('/')
        }else{
            res.render('loginPage' , {message : "Invalid Password" , email})
        }
    }
})


module.exports = router