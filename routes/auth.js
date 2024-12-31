const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router(); // mini instance

router.get('/register' , (req , res)=>{
    res.render('auth/signup');
})

// actuyall want to register a user in DB

router.post('/register' , async(req,res)=>{
    // try{
    let {email, password , username , role , gender} = req.body;
    const user = new User({email , username , role , gender});
    const newUser = await User.register(user , password);
    res.redirect('/login')
    // req.login(newUser, function(err){
        //         if(err){
            //             return next(err)
            //         }
            //         req.flash('success' , 'welcome, you register successfuly ');
            //         return res.redirect('/products')
            //     })
            // }
            // catch{
                //     req.flash('error' , e.message);
                //     return res.redirect('/signup');
                // }
            })

// to get login form

router.get('/login' , (req , res)=>{
    res.render('auth/login');
})

//to actually login via the db

router.post('/login' ,
    passport.authenticate('local',
        {
            failureRedirect: '/login',
            failureMessage:true
        }),
        (req , res)=>{
        //   console.log(req.user , 'sam'); 
          req.flash('success' ,  `Welcome Back ${req.user.username}`)
          res.redirect('/products');
})

// logout

router.get("/logout", (req, res) => {
    req.logout(() => {
      req.flash("success", "Logged out successfully");
      res.redirect("/login");
    });
  });


module.exports = router;