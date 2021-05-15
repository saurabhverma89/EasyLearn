const express = require('express')
const router = express.Router()
const easyLearnAPI = require('../models/easyLearnAPI')
const Request = require("request")
const tr = require('googletrans').default

router.use(getDefaults)

async function getDefaults(req, res, next){
    try{
        const languages = await easyLearnAPI.getLanguages()
        res.Languages = languages
    }
    catch(err){
        res.Error = err
    }
    next();
}

router.get('/', async (req, res) => {
    if(res.Error != null){
        res.render('errorPage', {
            Error: res.Error
        })
    }
    else{
        res.render('translateOneToMany/index', {
            Languages : res.Languages,
        })
    }
})

router.post('/:text', async (req, res) => {
    try{
        let result = []
        const languageCodes = req.body.languageCodes.split(',')
        for(let i = 0; i < languageCodes.length; i++){
            const languageCode = languageCodes[i]
            const tresult = await tr(req.params.text, { from : 'en', to: languageCode})
            if(tresult != null){
                result.push({
                    LanguageCode: languageCode,
                    Translation: tresult.text    
                })
            }
        }
        res.json(result)
    }catch(err){
        res.status(err.statusCode).json(err)
    }
})

module.exports = router  