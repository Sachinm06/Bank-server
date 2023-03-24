
//import express and store in a variable
const express = require("express")

//import ds
const ds = require('./service/dataService')

//app creation 
const app = express()

// to convert all datas from json to js
app.use(express.json())

//register post

app.post("/register", (req, res) => {

    const result = ds.register(req.body.acno, req.body.uname, req.body.psw)
    res.status(result.statusCode).json(result)
})

//login

app.post("/login", (req, res) => {

    const result = ds.login(req.body.acno, req.body.psw)
    res.status(result.statusCode).json(result)
})

//deposit

app.post("/deposit", (req, res) => {

    const result = ds.deposit(req.body.acno, req.body.psw,req.body.amnt)
    res.status(result.statusCode).json(result)
})

//withdraw

app.post("/withdrew", (req, res) => {

    const result = ds.withdrew(req.body.acno, req.body.psw,req.body.amnt)
    res.status(result.statusCode).json(result)
})

//register post
//login get
//deposit patch
//whitdraw patch
//transaction get
//delete delete



//resolve api
// app.get("/",(req,res)=>{
//        res.send('get method working........')
// })
// app.post("/",(req,res)=>{
//     res.send('post method working........')
// })
// app.put("/",(req,res)=>{
//     res.send('put method working........')
// })
// app.patch("/",(req,res)=>{
//     res.send('patch method working........')
// })
// app.delete("/",(req,res)=>{
//     res.send('delete method working........')
// })




//port set
app.listen(3000, () => {
    console.log("server started at port 3000");
})



