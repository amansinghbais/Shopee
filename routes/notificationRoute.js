const router = require('express').Router()
const User = require('../models/user')
const Request = require('../models/request')

router.get('/' , async (req,res,next)=>{
    var user = await User.findOne({email : req.session.email})
    var sentRequests = await Request.find({userEmail : req.session.email , isApproved : false})
    var recievedRequests = await Request.find({sellerEmail : req.session.email , isApproved : false})
    var notifications = await Request.find({userEmail : req.session.email , isApproved : true})
    res.render('notificationPage' , {user , sentRequests , recievedRequests , notifications})
})

router.get('/accept/:id' , async (req,res,next)=>{
    var id = req.params.id

    await Request.findOneAndUpdate({rid : id} , {isApproved : true})
    res.redirect('/notification')

})

router.get('/reject/:id' , async (req,res,next)=>{
    var id = req.params.id;

    await Request.findOneAndDelete({rid : id})
    res.redirect('/notification')

})

module.exports = router;