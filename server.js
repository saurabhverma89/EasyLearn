if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const languageRouter = require('./routes/language')
const categoryRouter = require('./routes/category')
const wordRouter = require('./routes/word')
const easyLearnAPI = require('./models/easyLearnAPI')
const session = require('express-session')


// app.set() is setting variables in app.locals.settings.{variable_Name}
app.set('view engine', 'ejs') //app.locals.settings.["view engine"]
app.set('views', __dirname + '/views') //app.locals.settings.views
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
//app.use('/static', express.static('public'))
app.use('/static', express.static(__dirname + '/public'));
//app.use(express.static('./'))
app.use(bodyParser.urlencoded({ limit:'10mb', extended: false }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(getMyLanguages)

app.use('/', indexRouter)
app.use('/language', languageRouter)
app.use('/category', categoryRouter)
app.use('/word', wordRouter)

app.post('/changeMyLanguage', async (req, res) =>{
    req.session.MyLanguageSelected = req.body.selMyLangugaes
    res.redirect('/')
})  

app.listen(process.env.PORT || 3000);

async function getMyLanguages(req, res, next) {
    try{
        MyLanguages = await easyLearnAPI.getLanguages()
        if(req.session.MyLanguageSelected == null){
            req.session.MyLanguageSelected = MyLanguages.find(x=>x.LanguageName == 'English')._id
        }

        MyLanguages.forEach(l => {
            if(!_variables.some(x=> x.name == l.LanguageName)){
                _variables.push({
                    name: l.LanguageName,
                    text: l.LanguageName
                })
            }
        })

        MyLanguageSelected = req.session.MyLanguageSelected
        variables =  _variables

        const words = _variables.map(x => x.name)
        const variableTrans = await easyLearnAPI.getTranslationsByWords(MyLanguageSelected, words)
        if(variableTrans != null){
            for(let i = 0; i < variableTrans.words.length; i++){
                if(variableTrans.words[i].translation != ''){
                    let v = _variables.find(x => x.name == variableTrans.words[i].word).text = variableTrans.words[i].translation
                }
            }
        }

        variables = _variables
    }
    catch(err){
        console.log(err)
    }
    next()
} 

let _variables = [
        {
            name: "My Language",
            text: "My Language"
        }
    ]
