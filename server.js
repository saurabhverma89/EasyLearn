if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const languageRouter = require('./routes/language')
const categoryRouter = require('./routes/category')
const wordRouter = require('./routes/word')
const easyLearnAPI = require('./models/easyLearnAPI')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
//app.use('/static', express.static('public'))
app.use('/static', express.static(__dirname + '/public'));
//app.use(express.static('./'))
app.use(bodyParser.urlencoded({ limit:'10mb', extended: false }))

//app.use(getMyLanguages)

//app.use('/', indexRouter)
app.use('/', (req, res) =>{
    res.send('Hello')
})

app.use('/language', languageRouter)
app.use('/category', categoryRouter)
app.use('/word', wordRouter)

app.listen(process.env.PORT || 3000);

async function getMyLanguages() {
    try{
        MyLanguages = await easyLearnAPI.getLanguages()
    }catch(err){
        console.log(err)
    }
}