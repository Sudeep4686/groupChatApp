const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.get("/",(req,res,next)=>{
    fs.readFile('username.txt', (err,data)=> {
        if(err){
            console.log(err)
            data = 'No chat exists'
        }
        res.send(
            `${data}<form action="/" method="POST" onSubmit="localStorage.getItem('username',document.getElementById('username').value)">
                <input type="text" name="message" id="message" placeholder="message"></input>
                <input type="hidden" name="username" id="username"></input>
                <button type="submit">Send</button>
                </form>`
        )
    })
});

app.post("/",(req,res,next)=>{
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt",`${req.body.username}:${req.body.message}`,{flag: 'a'},(err)=>
        err ? console.log(err) : res.redirect("/")
    );
    console.log(`${req.body.username}:${req.body.message}`);
});
app.get("/login",(req,res,next)=>{
    res.send
    (`<form action="/" method="POST" onSubmit="localStorage.setItem('username',document.getElementById('username').value)">
    <input type="text" name="username" id="username" placeholder="username"></input>
    <button type="submit">Login</button></form>`)
});

app.post("/login",(req,res,next)=>{
    fs.writeFile("username.txt",`${req.body.username}:${req.body.message}`,{flag: 'a'},(err)=>
        err ? console.log(err) : res.redirect("/")
    )
});


app.listen(4000);
