const express = require('express');
const app = express();
const session = require('express-session');


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUnintialized:true,
    // cookie:{secure:true}

}))

app.get('/' , (req , res)=>{
    res.send('welcome to session');
})

// count the visited site session

app.get('/viewcount' , (req , res)=>{
    if(req.session.count){
        req.session.count+=1;
    }
    else{
        req.session.count=1;
    }
    res.send(`you visited the site ${req.session.count} times `);
})

app.get('/setname',(req , res)=>{
    req.session.username = 'karan'
    res.redirect('/greet');
})

app.get('/greet' , (req , res)=>{
    let {username = "anonymous"} = req.session;
    res.send(`hi from ${username}`)
})


const PORT = 8080;
app.listen(PORT , ()=>{
    console.log(`server is connected ${PORT}`);
})