const express = require('express')
const router = express.Router()
const easyLearnAPI = require('../models/easyLearnAPI')
const categorySchema = require('../models/category')
const alerts = require('../models/alerts')

router.get('/', async (req, res) =>{
    try{
        const category = await easyLearnAPI.getCategories()
        res.render('category/index.ejs', {
            Category: category
        })
    }
    catch(err){
        res.render('errorPage', {
            Error: err
        })
    }
})

router.get('/new', (req, res) => {
    res.render('category/new', {
        Category: categorySchema,
    })
})

router.post('/new', async (req, res) => {
    let category
    try{
        category = {
            CategoryName : req.body.categoryName
        }
        const newCategory = await easyLearnAPI.createCategory(category)
        res.render('category/new', {
            Category : categorySchema,
            Alert : new alerts.Alert(alerts.alertType.Success, 'New Category created').getJson()
        })
    }
    catch(err){
        res.render('category/new', { 
            Category: category,
            Alert : new alerts.Alert(alerts.alertType.Error, err.message).getJson()
        })
    }
})

router.get('/edit/:categoryId', async (req, res) => {
    try{
        const category = await easyLearnAPI.getCategoryById(req.params.categoryId)
        res.render('category/edit', {
            Category: category
        })
    }
    catch(err){
        res.render('errorPage', {
            Error: err
        })
    }
})

router.post('/edit', async (req, res) => {
    let category
    try{
        category = {
            _id : req.body._id,
            CategoryName : req.body.categoryName
        }
        console.log(category)
        const updatedCategory = await easyLearnAPI.updateCategory(category)
        res.render('category/edit', {
            Category : updatedCategory,
            Alert : new alerts.Alert(alerts.alertType.Success, 'Category updated.').getJson()
        })
    }
    catch(err){
        res.render('category/edit', { 
            Category: category,
            Alert : new alerts.Alert(alerts.alertType.Error, err.message).getJson()
        })
    }
})

router.get('/delete/:categoryId', async (req, res) =>{
    try{
        const category = await easyLearnAPI.getCategoryById(req.params.categoryId)
        res.render('category/delete', {
            Category: category
        })
    }
    catch(err){
        res.render('errorPage', {
            Error: err
        })
    }
})

router.post('/delete', async (req, res) => {
    let category
    try{
        category = {
            _id : req.body._id,
            CategoryName : req.body.categoryName,
        }
        await easyLearnAPI.deleteCategory(category._id)
        res.redirect('/category')
    }
    catch(err){
        res.render('category/delete', { 
            Category: category,
            Alert : new alerts.Alert(alerts.alertType.Error, err.message).getJson()
        })
    }
})


module.exports = router