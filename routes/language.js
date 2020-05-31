const express = require('express')
const router = express.Router()
const easyLearnAPI = require('../models/easyLearnAPI')
const alerts = require('../models/alerts')

router.get('/', async (req, res) => {
    try{
        const languages = await easyLearnAPI.getLanguages()
        res.render('language/index.ejs', {
            Languages: languages
        })
    }
    catch(err){
        res.render('errorPage', {
            Error: err
        })
    }
})

router.get('/edit/:languageId', async (req, res) => {
    try{
        const language = await easyLearnAPI.getLanguageById(req.params.languageId)
        res.render('language/edit', {
            Language: language
        })
    }
    catch(err){
        res.render('errorPage', {
            Error: err
        })
    }
})

router.post('/edit', async (req, res) => {
    let language
    try{
        language = {
            _id : req.body._id,
            LanguageName : req.body.languageName,
            LanguageCode : req.body.languageCode
        }
        const updatedLanguage = await easyLearnAPI.updateLanguage(language)
        res.render('language/edit', {
            Language : updatedLanguage,
            Alert : new alerts.Alert(alerts.alertType.Success, 'Language updated.').getJson()
        })
    }
    catch(err){
        res.render('language/edit', { 
            Language: language,
            Alert : new alerts.Alert(alerts.alertType.Error, err.message).getJson()
        })
    }
})

router.get('/new', (req, res) => {
    res.render('language/new', {
        Language: {},
    })
})

router.post('/new', async (req, res) => {
    let language
    try{
        language = {
            LanguageName : req.body.languageName,
            LanguageCode : req.body.languageCode
        }
        const newLanguage = await easyLearnAPI.createLanguage(language)
        res.render('language/new', {
            Language : {},
            Alert : new alerts.Alert(alerts.alertType.Success, 'New language created').getJson()
        })
    }
    catch(err){
        res.render('language/new', { 
            Language: language,
            Alert : new alerts.Alert(alerts.alertType.Error, err.message).getJson()
        })
    }
})

router.get('/delete/:languageId', async (req, res) =>{
    try{
        const language = await easyLearnAPI.getLanguageById(req.params.languageId)
        res.render('language/delete', {
            IsDelete: true,
            Language: language
        })
    }
    catch(err){
        res.render('errorPage', {
            Error: err
        })
    }
})

router.post('/delete', async (req, res) => {
    let language
    try{
        language = {
            _id : req.body._id,
            LanguageName : req.body.languageName,
            LanguageCode : req.body.languageCode
        }
        await easyLearnAPI.deleteLanguage(language._id)
        res.redirect('/language')
    }
    catch(err){
        res.render('language/delete', { 
            Language: language,
            Alert : new alerts.Alert(alerts.alertType.Error, err.message).getJson()
        })
    }
})


module.exports = router