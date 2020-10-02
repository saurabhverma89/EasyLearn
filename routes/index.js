const express = require('express')
const router = express.Router()
const easyLearnAPI = require('../models/easyLearnAPI')
const Request = require("request")

router.use(getDefaults)
router.use(getLocalization)


router.get('/', async (req, res) => {
    if(res.Error != null){
        res.render('errorPage', {
            Error: res.Error
        })
    }
    else{
        res.render('index', {
            Languages : res.Languages,
            Categories : res.Categories,
            Localization : res.Localization,
            Variables : res.Variables
        })
    }
})

// routes for ajax requests - Begin
router.get('/getTranslation/:categoryId/:sourceLangId/:destLangId/:selectedLanguageId', getDefaults, async (req, res) => {
    try{
        const translations =  await easyLearnAPI.getTranslations(req.params.categoryId, req.params.sourceLangId, req.params.destLangId,
            req.params.selectedLanguageId)
        res.json(translations)
    }catch(err){
        res.status(err.statusCode).json(err)
    }
})
// routes for ajax requests - End

async function getDefaults(req, res, next){
    try{
        const languages = await easyLearnAPI.getLanguages()
        languages.forEach(l => {
            if(!_variables.some(x=> x.name == l.LanguageName)){
                _variables.push({
                    name: l.LanguageName,
                    text: l.LanguageName
                })
            }
        })
        const categories = await easyLearnAPI.getCategoriesExceptInternal()
        categories.forEach(c => {
            if(!_variables.some(x=> x.name == c.CategoryName)){
                _variables.push({
                    name: c.CategoryName,
                    text: c.CategoryName
                })
            }
        })
        res.Languages = languages
        res.Categories = categories
    }
    catch(err){
        res.Error = err
    }
    next();
}

async function getLocalization(req, res, next) {
    res.Variables = _variables
    try{
        const words = _variables.map(x => x.name)
        const variableTrans = await easyLearnAPI.getTranslationsByWords(MyLanguageSelected, words)
        if(variableTrans != null){
            for(let i = 0; i < variableTrans.words.length; i++){
                if(variableTrans.words[i].translation != ''){
                    let v = _variables.find(x => x.name == variableTrans.words[i].word).text = variableTrans.words[i].translation
                }
            }
        }
        res.Variables = _variables
    }
    catch(err){
        console.log(err)
    }
    next()
}

let _variables = [
    {
        name: "Select Category",
        text: "Select Category"
    },
    {
        name: "Translate From",
        text: "Translate From"
    },
    {
        name: "Translate Into",
        text: "Translate Into"
    },
    {
        name: "Plaese Select",
        text: "Plaese Select"
    },
    {
        name: "Welcome to",
        text: "Welcome to"
    }
]

module.exports = router  