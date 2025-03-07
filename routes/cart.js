const express = require('express');
const router = express.Router(); //mini instance
const {isLoggedIn} = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');

//router too see cart

router.get('/user/cart' , isLoggedIn , async(req,res)=>{
   let userId = req.user._id;
    let user = await User.findById(req.user._id).populate('cart');
    let totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
    const productInfo = user.cart.map((p)=>p.desc).join(',');
    res.render('cart/cart' , {user , totalAmount ,productInfo })
   })



// actuall addding product in cart 

router.post('/user/:productId/add' , isLoggedIn, async(req , res)=>{
   let {productId} = req.params;
   let userId = req.user._id;
   let product = await Product.findById(productId);
   let user = await User.findById(userId);
   user.cart.push(product);
   await user.save(); 
   res.redirect('/user/cart');
})

module.exports = router;