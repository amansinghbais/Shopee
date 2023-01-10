const router = require('express').Router()
const User = require('../models/user')

router.get('/' , async (req,res,next)=>{
    var user = await User.findOne({email : req.session.email})
    res.render('profile' ,{user} )
})

router.get('/edit' , async (req , res , next)=>{
    var user = await User.findOne({email : req.session.email})
    res.render('profileEditPage' , {user})
})

router.post('/edit' , async (req , res, next)=>{
    var user = await User.findOne({email : req.session.email})
    const { name , about , email , mobile , address } = req.body;
    console.log(req.body)
    var error  ={}
    if(mobile.length != 10){
        error.mobile = "Mobile No. should be of 10 digits."
    }
    if(address.length < 10){
        error.mobile = "Address should be of atleast 10 characters."
    }
    if(email != user.email){
        var checkEmail = await User.findOne({email : email})
        if(checkEmail){
            error.email = "Email already registered"
        }
    }
    if(mobile != user.mobile){
        var checkMobile = await User.findOne({mobile : mobile})
        if(checkMobile){
            error.mobile = "This mobile no. is  already registered"
        }
    }

    if(Object.keys(error).length > 0){
        res.render('profileEditPage' , {user , error , name , email , about , mobile , address})
    }else{
        User.findOneAndUpdate({email : req.session.email} , {
            name : name , 
            email : email , 
            about : about , 
            mobile : mobile,
            address : address
        } , (err , docs)=>{
            if(err){
                console.log(err);
            }else{
                console.log("Result : " + docs);
            }
        })
        res.redirect('/profile')
    }
})

module.exports = router;