const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const path = require('path')
const port = 3019

// mongodb://127.0.0.1:27017/students'
//connect using env variable


const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI)
// mongoose.connect('mongodb://127.0.0.1:27017/students')
const db = mongoose.connection
db.once('open', () => {
    console.log("Mongodb connection successful on port 3019")
})

const userSchema = new mongoose.Schema({
    regd_no: String,
    name: String,
    email: String,
    branch: String
})

const Users = mongoose.model("info", userSchema)
const Users2 = mongoose.model("name", userSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'))
})

app.get('/form2', (req, res) => {
    res.sendFile(path.join(__dirname, 'form2.html'))
})

app.post('/post', async (req, res, next) => {
    const { regd_no, name, email, branch } = req.body
    const user = new Users({
        regd_no,
        name,
        email,
        branch
    })
    await user.save()
    console.log(user)
    res.send("Form submission Succesful")
    res.redirect('/form2');
    
    next();
})

app.post('/post2', async (req, res, next) => {
    const { name} = req.body
    // const { regd_no, name, email, branch } = req.body
    const user = new Users2({
        // regd_no,
        name
        // email,
        // branch
    })
    await user.save()
    console.log(user)
    res.send("Form submission Succesful")
    res.redirect('/form2');
    
    next();
})


app.get('/test', (req, res) => {
    res.send("hello, go form next")
})

app.listen(port, () => {
    console.log('server started')
})


