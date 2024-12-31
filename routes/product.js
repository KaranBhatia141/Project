const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router();
const {validateProduct} = require('../middleware');
const {isLoggedIn} = require('../middleware');
const {isSeller} = require('../middleware');
const {isProductAuthor} = require('../middleware');
const {showAllProducts, productForm , createProduct , showProduct , editProductForm , updateProduct , deleteProduct} =  require('../controllers/product');

router.get('/products'  , isLoggedIn ,showAllProducts);

router.get('/products/new', isLoggedIn, isSeller, productForm);

router.post('/products', isLoggedIn, isSeller, validateProduct, createProduct);

router.get('/products/:id', isLoggedIn, showProduct);


router.get('/products/:id/edit',isLoggedIn,isProductAuthor, editProductForm);

router.patch('/products/:id', isLoggedIn, isProductAuthor, validateProduct, updateProduct);


router.delete('/products/:id',isLoggedIn,isProductAuthor,deleteProduct);


// router.get('/products' , isLoggedIn , async(req , res)=>{
//    try{
//       let products = await Product.find({});
//       res.render('products/index',{products});
//    }
//    catch(e){
//       res.status(500).render('error' , {err:e.message});
//    }
// })
   
// // to show new product 

// router.get('/products/new' ,isLoggedIn,isSeller, (req , res)=>{
//    try{
//    res.render('products/new');
// }
// catch(e){
//    res.status(500).render('error' , {err:e.message});
// }
// })

// // to actually add the products 

// router.post('/products' ,validateProduct, isLoggedIn, isSeller,async (req ,res)=>{
//    try{
//    let {name , img , price , desc} = req.body;
//    await Product.create({name , img , price , desc , author:req.user._id});
//    req.flash('success','Product Added successfully');
//    res.redirect('/products');
// }
// catch(e){
//    res.status(500).render('error' , {err:e.message});
// }
// })

// // to show a prticular product 

// router.get('/products/:id',isLoggedIn, async (req,res)=>{
//    try{
//    let {id} = req.params;
//    let foundProduct = await Product.findById(id).populate('reviews');
//    res.render('products/show' , {foundProduct , msg:req.flash('msg')})
//    }
//    catch(e){
//       res.status(500).render('error' , {err:e.message});
//    }
// })

// // form to edit the product 

// router.get('/products/:id/edit' ,isLoggedIn, isSeller, async(req , res)=>{
//    try{
//    let {id} = req.params;
//    let foundProduct = await Product.findById(id);
//    res.render('products/edit' , {foundProduct})
//    }
//    catch(e){
//       res.status(500).render('error' , {err:e.message});
//    }
// })

// // to actually edit data in DB 

// router.patch('/products/:id' ,validateProduct,isLoggedIn, isSeller, async(req , res )=>{
//    try{
//    let {id} = req.params;
//    let {name , img , price , desc} = req.body;
//    await Product.findByIdAndUpdate(id , {name , img , price , desc})
//    req.flash('success','Product edited successfully');
//    res.redirect(`/products/${id}`);
//    }
//    catch(e){
//       res.status(500).render('error' , {err:e.message});
//    }
// })

// // to delete product 

// router.delete('/products/:id' , isLoggedIn , isSeller, isProductAuthor, async(req ,res)=>{
//    try{
//    let {id} = req.params;
//    const product = await Product.findById(id);
//    for(let id of product.reviews){
//        await Review.findByIdAndDelete(id);
//    } 
//    await Product.findByIdAndDelete(id);
//    req.flash('success','Product Deleted successfully');
//    res.redirect('/products');
//    }
//    catch(e){
//       res.status(500).render('error' , {err:e.message});
//    }
// })


module.exports = router;




 