const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('youneedbeabettersecret'));

app.get('/' , (req , res)=>{
    console.log(req.cookies);
    // res.send(req.cookies); all easy cookies
    res.send(req.signedCookies); //allsigned cookies
})

app.get('/getsignedcookies' , (req , res)=>{
    res.cookie('bindaas' , 'sachin' , {signed:true})
    res.send('cookies sent successfully');
    
})

// app.get('/setcookie' ,(req , res)=>{
//     res.cookie('mode' , 'dark');
//     res.cookie('location' , 'delhi');
//     res.cookie('username' , 'karan');
//     res.send('server sent you response');
// })

// app.get('/getcookies' , (req , res)=>{
//     let {mode , location , username} = req.cookies;
//     res.send(`name is ${username} , stay in ${location} and theem is ${mode}`);
// })

const PORT = 8080;
app.listen(PORT , ()=>{
    console.log(`Server is connected to : ${PORT}`);
})