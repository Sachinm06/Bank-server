
//import express and store in a variable

const express = require("express")

//import cors
const cors = require("cors")

//import ds

const ds = require('./service/dataService')

//import jswt

const jwt = require("jsonwebtoken")

//app creation 

const app = express()

//integrate app with frontend

app.use(cors({ origin: 'http://localhost:4200' }))

// to convert all datas from json to js

app.use(express.json())

//middleware creation

const jwtmiddleware = (req, res, next) => {

    try { //access data from request body
        const token = req.headers['access_token']

        //verify the token with secret key
        const data = jwt.verify(token, "superkey123")
        console.log(data);

        next()
    }
    catch {
        res.status(422).json({
            status: false,
            message: "please login",
            statusCode: 404
        })
    }
}

//register post

app.post("/register", (req, res) => {

    ds.register(req.body.acno, req.body.uname, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)

    })
})

//login

app.post("/login", (req, res) => {

    ds.login(req.body.acno, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)

    })
})

//deposit

app.post("/deposit", jwtmiddleware, (req, res) => {

    ds.deposit(req.body.acno, req.body.psw, req.body.amnt).then(result => {
        res.status(result.statusCode).json(result)

    })
})

//withdraw

app.post("/withdrew", jwtmiddleware, (req, res) => {

    ds.withdrew(req.body.acno, req.body.psw, req.body.amnt).then(result => {
        res.status(result.statusCode).json(result)

    })
})

//transaction

app.post("/getTransaction", jwtmiddleware, (req, res) => {

    ds.getTransaction(req.body.acno).then(result => {
        res.status(result.statusCode).json(result)

    })
})

app.delete("/delete/:acno", jwtmiddleware, (req, res) => {
    ds.deleteAcc(req.params.acno).then(result => {
        res.status(res.statusCode).json(result)
    })
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



