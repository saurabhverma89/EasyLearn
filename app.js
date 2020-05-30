const createError = require('http-errors')
const express = require("express");
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./route/index')
//const userRouter = require('./routes/user')

const bodyParser = require("body-parser")

const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectID

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', indexRouter)
//app.use('/user', userRouter)

app.listen(5000, () => {})