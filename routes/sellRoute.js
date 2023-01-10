const router = require('express').Router()
const User = require('../models/user')
const Ad = require('../models/ad')
const uniqid = require('uniqid')

router.get('/' , async (req , res , next)=>{
    var user = await User.findOne({email : req.session.email})
    res.render('sellPage' , {user})
})

router.post('/' ,  async (req , res , next)=>{
    var user = await User.findOne({email : req.session.email})
    var {brand , title , desc , price , imgUrl , city , sellerName , category} = req.body
    const newAd = new Ad({
        aid : uniqid(),
        brand : brand,
        title : title,
        description : desc,
        price : price,
        imgUrl : imgUrl,
        city : city,
        sellerId : user.uid,
        sellerName : sellerName,
        category : category
    })
    await newAd.save()
    res.render('sellPage' , {user , message : "Ad successfully added!"})

})

module.exports = router;