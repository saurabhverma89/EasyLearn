const Request = require("request-promise")
const apiURL = process.env.EASYELEARN_API_URL

const getTranslations = async (categoryId, sourceLanguageId, destLanguageId, selectedLanguageId) => {
    let response
    await Request.get(`${apiURL}translation/${categoryId}/${sourceLanguageId}/${destLanguageId}/${selectedLanguageId}`, { json:true })
    .then(res => {
        response = res
    })
    .catch(err => {
       throw getError(err)
    })
    return response
}

const getLanguages = async () => {
    try{
        let response = await Request.get(`${apiURL}language`,  { json:true })
        return response
    }catch(err){
        throw getError(err)
    }
}

const getLanguageById = async (id) => {
    let response
    await Request.get(`${apiURL}language/${id}`, { json:true })
    .then(res =>{
        response = res
    })
    .catch(err => {
        throw getError(err)
    })
    return response
}

const createLanguage = async (Language) => {
    try{
        let options = {
            method: 'POST',
            uri: `${apiURL}language`,
            body: {
                LanguageName: Language.LanguageName, 
                LanguageCode: Language.LanguageCode
            },
            json: true,
        };
        const response = await Request(options)
        return response
    }
    catch(err){
        throw getError(err)
    }
}

const updateLanguage = async (Language) => {
    try{
        let options = {
            method: 'PATCH',
            uri: `${apiURL}language/${Language._id}`,
            body: {
                LanguageName: Language.LanguageName, 
                LanguageCode: Language.LanguageCode
            },
            json: true
        };
        const response = await Request(options)
        return response
    }
    catch(err){
        throw getError(err)
    }
}

const deleteLanguage = async (_id) => {
    try{
        let options = {
            method: 'DELETE',
            uri: `${apiURL}language/${_id}`,
            json: true
        };
        const response = await Request(options)
        return response
    }
    catch(err){
        throw getError(err)
    }
}

const getCategories = async () => {
    try{
        let response =  await Request.get(`${apiURL}category`, { json: true })
        return response
    }catch(err){
        throw getError(err)
    }
}

const getCategoriesExceptInternal = async () => {
    try{
        let response =  await Request.get(`${apiURL}category`, { json: true })
        return response.filter(x => x.CategoryName[0] != '_')
    }catch(err){
        throw getError(err)
    }
}

const getCategoryById = async (id) => {
    let response
    await Request.get(`${apiURL}Category/${id}`, { json:true })
    .then(res =>{
        response = res
    })
    .catch(err => {
        throw getError(err)
    })
    return response
}

const createCategory = async (Category) => {
    try{
        let options = {
            method: 'POST',
            uri: `${apiURL}category`,
            body: {
                CategoryName: Category.CategoryName
            },
            json: true,
        };
        const response = await Request(options)
        return response
    }
    catch(err){
        throw getError(err)
    }
}

const updateCategory = async (Category) => {
    try{
        let options = {
            method: 'PATCH',
            uri: `${apiURL}category/${Category._id}`,
            body: {
                CategoryName: Category.CategoryName
            },
            json: true
        };
        const response = await Request(options)
        return response
    }
    catch(err){
        throw getError(err)
    }
}

const deleteCategory = async (_id) => {
    try{
        let options = {
            method: 'DELETE',
            uri: `${apiURL}category/${_id}`,
            json: true
        };
        const response = await Request(options)
        return response
    }
    catch(err){
        throw getError(err)
    }
}

function getError(err){
    let _statusCode = '', _message = ''
    if(err != null){
        if(err.statusCode == null){
            _statusCode = 500
        }else{
            _statusCode = err.statusCode
        }
        if(err.error != null && err.error.message != null){
           _message = err.error.message
        }
        else{
            _message = err.message
        }
    }
    console.log('API', _statusCode, _message)
    return {statusCode: _statusCode, message: _message}
}

const getWordsByCategory = async (categoryId) => {
    try{
        let response =  await Request.get(`${apiURL}word/Category/${categoryId}`, { json: true })
        return response
    }catch(err){
        throw getError(err)
    }
}

const createWord = async (Word) => {
    try{
        let options = {
            method: 'POST',
            uri: `${apiURL}word`,
            body: {
                CategoryId: Word.CategoryId,
                WordText: Word.WordText
            },
            json: true,
        };
        const response = await Request(options)
        return response
    }
    catch(err){
        throw getError(err)
    }
}

const getWordById = async (id) => {
    let response
    await Request.get(`${apiURL}word/${id}`, { json:true })
    .then(res =>{
        response = res
    })
    .catch(err => {
        throw getError(err)
    })
    return response
}

const updateWord = async (Word) => {
    try{
        let options = {
            method: 'PATCH',
            uri: `${apiURL}word/${Word._id}`,
            body: {
                CategoryId: Word.CategoryId,
                WordText: Word.WordText
            },
            json: true
        };
        const response = await Request(options)
        return response
    }
    catch(err){
        throw getError(err)
    }
}

const deleteWord = async (_id) => {
    try{
        let options = {
            method: 'DELETE',
            uri: `${apiURL}word/${_id}`,
            json: true
        };
        const response = await Request(options)
        return response
    }
    catch(err){
        console.log(err.message)
        throw getError(err)
    }
}

const getTranslationsByWords = async (destLanguageId, wordsArray) => {
    try{
        let options = {
            method: 'POST',
            uri: `${apiURL}translation/${destLanguageId}`,
            body: {
                words: wordsArray
            },
            json: true,
        };
        const response = await Request(options)
        return response
    }
    catch(err){
        throw getError(err)
    }
}

const getLanguageWithNativeName = async () => {
    try{
        let response = await Request.get(`${apiURL}languageWithNativeName`,  { json:true })
        return response
    }catch(err){
        throw getError(err)
    }
}

module.exports = {getTranslations, getTranslationsByWords, 
                    getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage,
                    getCategories, getCategoriesExceptInternal, getCategoryById, createCategory, updateCategory, deleteCategory,
                    getWordsByCategory, createWord, getWordById, updateWord, deleteWord, getLanguageWithNativeName}