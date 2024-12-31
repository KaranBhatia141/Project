const mongoose = require("mongoose");
const Review   = require("./Review");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trime:true,
        required:true
    } ,
    img:{
        type:String,
        trime:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
   
    desc:{
        type:String,
        trim:true
    },
    avgRating:{
        type:Number,
        default:0
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    author:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'User'
    }
})

// middleware jo BTS mongoDB operations karwane pr use hota iske anda pre and post method hote h for schema models

productSchema.post('findOneAndDelete' , async function(product){
       if(product.reviews.length>0){
           await Review.deleteMany({_id:{$in:product.reviews}})
       }
})

let Product = mongoose.model('Product' , productSchema);
module.exports = Product; 