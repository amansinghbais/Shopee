require('dotenv').config();
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session')
const app = express();
const auth = require('./config/auth')
require('./config/connection')

app.set("view engine" , 'ejs');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false , maxAge : 60 * 60 * 24 * 6000}
  }))
app.use(bodyParser.urlencoded({extended : false}))
app.use(express.static('public'))


// Requiring Routes
const indexRoute = require('./routes/indexRoute')
const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
const profileRoute = require('./routes/profileRoute')
const sellRoute = require('./routes/sellRoute')
const productRoute = require('./routes/productRoute')
const myadsRoute = require('./routes/myadsRoute')
const notificationRoute = require('./routes/notificationRoute')


// Using Routes
app.use('/'  ,indexRoute)
app.use('/login' ,  loginRoute)
app.use('/register' , registerRoute)
app.use('/profile' , auth , profileRoute)
app.use('/sell' , auth , sellRoute)
app.use('/product' , auth , productRoute)
app.use('/myads' , auth , myadsRoute)
app.use('/notification' , auth , notificationRoute)

// Listening app
app.listen(process.env.PORT , (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server started at " + process.env.PORT);
    }
})


