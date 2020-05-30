if(process.env.NODE_ENV != 'production'){
    require('dotenv/config')
}
const Request = require("request-promise")
const apiURL = process.env.EASYELEARN_API_URL

const getTranslations = async (categoryId, sourceLanguageId, destLanguageId) => {
    let response
    await Request.get(`${apiURL}translation/${categoryId}/${sourceLanguageId}/${destLanguageId}`, { json:true })
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
    let response
    await Request.get(`${apiURL}category`, { json: true })
    .then(res => {
        response = res
    })
    .catch(err => {
        throw getError(err)
    })
    return response
}

function getError(err){
    let _statusCode = '', _message = ''
    if(err != null){
        _statusCode = err.statusCode
        if(err.error != null){
           _message = err.error.message
        }
        else{
            _message = err.message
        }
    }
    console.log('API', _statusCode, _message)
    return {statusCode: _statusCode, message: _message}
}

module.exports = {getTranslations, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage, getCategories}