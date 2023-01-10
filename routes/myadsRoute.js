const router = require('express').Router()
const User = require('../models/user')
const Ad = require('../models/ad')

router.get('/' , async (req , res , next)=>{
    var user = await User.findOne({email : req.session.email})
    var myAds = await Ad.find({sellerId : user.uid})
    console.log(user)
    console.log(myAds)
    res.render('myadsPage' , {user , myAds})
})

router.post('/delete/:id' , async (req,res,next)=>{
    var id = req.params.id;

    await Ad.deleteOne({aid : id});
    res.redirect('/myads')

})

module.exports = router