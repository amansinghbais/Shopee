const router = require('express').Router()
const User = require('../models/user')
const Ad = require('../models/ad')
const Request = require('../models/request')
const uniqid = require('uniqid')


router.get('/' , async (req , res , next)=>{
    if(req.session.email){
        var user = await User.findOne({email : req.session.email})
        var product = await Ad.findOne({aid : req.query.id})
        console.log("Product " + product)
        var seller = await User.findOne({uid : product.sellerId})
        console.log("Seller : " + seller)

        var r = await Request.findOne({userEmail : user.email , productID : product.aid})
        var requested;
        if(r != null){
            requested = true
        }else{
            requested = false;
        }
        res.render('productPage' , {user , product , seller , requested})
    }else{
        res.redirect('/login')
    }
})

router.post('/request' ,async (req, res , next)=>{
    console.log(req.query)
    var user = await User.findOne({uid : req.query.uid})
    var seller = await User.findOne({uid : req.query.sid})
    var product = await Ad.findOne({aid : req.query.aid})
    var reason = req.body.reason

    const newRequest = new Request({
        rid : uniqid(),
        userId : user.uid,
        userName : user.name,
        userEmail : user.email,
        userMobile : user.mobile,
        userAddress : user.address,
        reason : reason,
        productID : product.aid,
        productTitle : product.title,
        productPrice : product.price,
        productImage : product.imgUrl,
        sellerId : seller.uid,
        sellerName : seller.name,
        sellerEmail : seller.email,
        sellerMobile : seller.mobile,
        sellerAddress : seller.address,
        isApproved : false
    })
    await newRequest.save()
    res.redirect('/product/?id=' + newRequest.productID)

})

module.exports = router