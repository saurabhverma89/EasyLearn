const express = require('express')
const router = express.Router()
const easyLearnAPI = require('../models/easyLearnAPI')
const alerts = require('../models/alerts')

//router.use(getCategories)

async function getCategories(req, res, next){
    try{
        const categories = await easyLearnAPI.getCategories()
        res.Category = categories
        next()
    }
    catch(err){
        res.render('errorPage',{
            Error: err
        })
    }
}

router.get('/', getCategories, async (req, res) => {
    res.render('word/index', {
        Category: res.Category,
        Words : {}
    })
})

// routes for ajax requests - Begin
router.get('/getWordsByCategory/:categoryId', async (req, res) => {
    try{
        const words =  await easyLearnAPI.getWordsByCategory(req.params.categoryId)
        res.json(words)
    }catch(err){
        res.status(err.statusCode).json(err)
    }
})
// routes for ajax requests - End

router.get('/new', getCategories, async (req, res) => {
    try{
        res.render('word/new', {
            Category: res.Category,
            Word: {}
        })
    }
    catch(err){
        res.render('errorPage',{
            Error: err
        })
    }
})

router.post('/new', getCategories, async (req, res) => {
    let word
    try{
        word = {
            CategoryId : req.body.categoryId,
            WordText : req.body.wordText
        }
        const newWord = await easyLearnAPI.createWord(word)
        res.render('word/new', {
            Category: res.Category,
            CategorySelected: word.CategoryId,
            Word : {},
            Alert : new alerts.Alert(alerts.alertType.Success, 'New word created').getJson()
        })
    }
    catch(err){
        res.render('word/new', { 
            Category: res.Category,
            CategorySelected: word.CategoryId,
            Word: word,
            Alert : new alerts.Alert(alerts.alertType.Error, err.message).getJson()
        })
    }
})

router.get('/edit/:wordId', getCategories, async (req, res) => {
    try{
        const word = await easyLearnAPI.getWordById(req.params.wordId)
        res.render('word/edit', {
            Category: res.Category,
            CategorySelected: word.CategoryId._id,
            Word: word
        })
    }
    catch(err){
        res.render('errorPage',{
            Error: err
        })
    }
})

router.post('/edit', getCategories, async (req, res) => {
    let word
    try{
        word = {
            _id : req.body._id,
            CategoryId : req.body.categoryId,
            WordText : req.body.wordText
        }
        const updatedWord = await easyLearnAPI.updateWord(word)
        res.render('word/edit', {
            Category: res.Category,
            CategorySelected: word.CategoryId,
            Word: word,
            Alert : new alerts.Alert(alerts.alertType.Success, 'Word updated.').getJson()
        })
    }
    catch(err){
        res.render('word/edit', { 
            Category: res.Category,
            CategorySelected: word.CategoryId,
            Word: word,
            Alert : new alerts.Alert(alerts.alertType.Error, err.message).getJson()
        })
    }
})

router.get('/delete/:wordId', getCategories, async (req, res) =>{
    try{
        const word = await easyLearnAPI.getWordById(req.params.wordId)
        res.render('word/delete', {
            Category: res.Category,
            CategorySelected: word.CategoryId._id,
            Word: word,
            IsDelete: true
        })
    }
    catch(err){
        res.render('errorPage', {
            Error: err
        })
    }
})

router.post('/delete', getCategories, async (req, res) => {
    let word
    try{
        word = {
            _id : req.body._id,
            CategoryId : req.body.categoryId,
            WordText : req.body.wordText
        }
        await easyLearnAPI.deleteWord(word._id)
        res.redirect('/word')
    }
    catch(err){
        res.render('word/delete', { 
            Category: res.Category,
            CategorySelected: word.CategoryId,
            Word: word,
            Alert : new alerts.Alert(alerts.alertType.Error, err.message).getJson()
        })
    }
})


module.exports = router