const mongoose = require('mongoose');

const Product = require('./models/Product');

const products = [{
     name:'Iphone 14 pro',
     img:"https://images.unsplash.com/photo-1697898706719-bce6e007c817?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTR8ZW58MHx8MHx8fDA%3D",
     price: 130000,
     desc:"aukaat ke bahar"
},
{
    name:"Macbook m2 pro",
    img:"https://images.unsplash.com/photo-1717865499857-ec35ce6e65fa?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMG0yfGVufDB8fDB8fHww",
    price: 250000,
    desc:"ye toh bilkul aukaaat ke bhaar h"
},
{
    name:"Ultra Watched",
    img:"https://images.unsplash.com/photo-1708302599135-6bf279ab155b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjB1bHRyYSUyMHdhdGNofGVufDB8fDB8fHww",
    price:51000,
    desc:"ye sasta h lelo "
},
{
    name:"iPad Pro",
    img:"https://media.istockphoto.com/id/1419516904/photo/ipad-pro-with-white-screen-on-yellow-background-with-apple-pencil-flat-lay.webp?a=1&b=1&s=612x612&w=0&k=20&c=HfkrB5ngj-fVftNx3sHYtkiEIUCvAVsUCrn7kHJtLKk=",
    price:237900,
    desc:"kuch chize duur se hi achi lgati h"
},
{
    name:"airpods",
    img:"https://media.istockphoto.com/id/1254998855/photo/airpod-with-black-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=1Wzz7CKrZHSh4Gyk-U9OHC62en4kPzaSGazQb33zkSg=",
    price:25000,
    desc:"kamo kamo phir lo"
}
]

 async function seedDB(){
   await Product.insertMany(products);
    console.log("data seeded successfully");
}


module.exports = seedDB;
