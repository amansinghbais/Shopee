const router = require('express').Router()
const User = require('../models/user')
const Ad = require('../models/ad')
const Request = require('../models/request')


router.get('/' , async (req , res , next)=>{
    var cityName = req.query.q;
    if(typeof cityName != 'undefined'){
        if(cityName == 'all'){
            var products = await Ad.find({})
        }else{
            var products = await Ad.find({city : cityName})
        }
    }else{
        var products = await Ad.find({})
    }
    if(req.session.email){
        var user = await User.findOne({email : req.session.email})
        var requests = Request.find({userEmail : req.session.email});
        var notifications = Request.find({sellerEmail : req.session.email});
        if(cityName != 'all'){
            res.render('home' , {user , products , requests , notifications , cityName})
        }else{
            res.render('home' , {user , products , requests , notifications })
        }
    }else{
        if(cityName != 'all'){
            res.render('home' , {user , products , cityName})
        }else{
            res.render('home' , {user , products })
        }
    }
})

router.get('/logout' , (req , res ,next)=>{
    req.session.destroy()
    res.redirect('/');
})


module.exports = router