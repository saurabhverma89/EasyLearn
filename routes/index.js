const express = require('express')
const router = express.Router()
const easyLearnAPI = require('../models/easyLearnAPI')
const Request = require("request")

router.get('/', getDefaults, async (req, res) => {
    if(res.Error != null){
        res.render('errorPage', {
            Error: res.Error
        })
    }
    else{
        res.render('index', {
            Languages : res.Languages,
            Categories : res.Categories
        })
    }
})

// routes for ajax requests - Begin
router.get('/getTranslation/:categoryId/:sourceLangId/:destLangId', getDefaults, async (req, res) => {
    try{
        const translations =  await easyLearnAPI.getTranslations(req.params.categoryId, req.params.sourceLangId, req.params.destLangId)
        res.json(translations)
    }catch(err){
        res.status(err.statusCode).json(err)
    }
})
// routes for ajax requests - End

async function getDefaults(req, res, next){
    try{
        const languages = await easyLearnAPI.getLanguages()
        const categories = await easyLearnAPI.getCategories()
        res.Languages = languages
        res.Categories = categories
    }
    catch(err){
        res.Error = err
    }
    next();
}

module.exports = router  