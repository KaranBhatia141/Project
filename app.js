// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').config();
// }
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const productApi = require("./routes/api/productapi"); //api
const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
// const MongoStore = require('connect-mongo');
// const paymentRoutes = require('./routes/payment');




mongoose.connect('mongodb://127.0.0.1:27017/Shopping-karan-app')
.then(()=>{
    console.log("DB connected successfully");
})
.catch(()=>{
    console.log("DB error");
    console.log(err);
})

//session
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUnintialized: true,
    cookie:{
        httpOnly:true,
        expires: Date.now() + 24*7*60*60*1000 ,
        maxAge: 24*7*60*60*1000 
    }
}
app.engine('ejs', ejsMate);
app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname ,'views'));   // views  
app.use(express.static(path.join(__dirname , 'public')));  //public]
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.use(flash());
app.use(session(configSession));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req , res , next)=>{
     res.locals.currentUser = req.user;
     res.locals.success = req.flash('success');
     res.locals.error = req.flash('error');
     next();
})

// let secret = process.env.SECRET || 'weneedabettersecretkey';

// let store = MongoStore.create({
//     secret:secret,
//     mongoUrl: dbURL,
//     touchAfter:24*60*60
// })
// Passport
passport.use(new LocalStrategy(User.authenticate()));
   

// seed database
// seedDB();

app.get("/", (req, res) => {
    res.render("home");
  });

app.use(productRoutes); //incoming request product
app.use(reviewRoutes); //incoming request reivew
app.use(authRoutes);  // authentication  
app.use(cartRoutes);  // for carts
app.use(productApi);
// app.use(paymentRoutes);


const PORT = 8080;
app.listen(PORT , ()=>{
      console.log(`Server is connected at ${PORT}`);
})


