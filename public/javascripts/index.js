const selSourceLang = document.getElementById('selSourceLang')
const selDestLang = document.getElementById('selDestLang')
const selCategory = document.getElementById('selCategory')
const tblTrans= document.getElementById('tblTrans')
const divSwapLang = document.getElementById('divSwapLang')

selSourceLang.addEventListener('change', (e)  => {
    getTranslations()
})

selDestLang.addEventListener('change', (e) => {
    getTranslations()
})

selCategory.addEventListener('change', (e) => {
    getTranslations()
})

function getTranslations(){
    clearTable()
    const categoryId = selCategory.options[selCategory.selectedIndex].value
    const sourceLangId = selSourceLang.options[selSourceLang.selectedIndex].value
    const destLangId = selDestLang.options[selDestLang.selectedIndex].value
    if(categoryId != "0" && sourceLangId != "0" && destLangId != "0"){
        fetch(`/getTranslation/${categoryId}/${sourceLangId}/${destLangId}`)
        .then(res => res.json())
        .then(data => showTranslations(data))
        .catch(err => console.error(err))
    }
}

function showTranslations(data){
    try{
        let thead = document.createElement('thead')
        let thead_tr = document.createElement('tr')
        let thead_tr_thSource = document.createElement('th')
        let thead_tr_thDesc = document.createElement('th')
        
        thead_tr_thSource.innerHTML = `In ${data.SearchCriteria.SourceLanguage}`
        thead_tr_thDesc.innerHTML = `In ${data.SearchCriteria.DestLanguage}`
        thead_tr.appendChild(thead_tr_thSource)
        thead_tr.appendChild(thead_tr_thDesc)
        thead.appendChild(thead_tr)
        tblTrans.appendChild(thead)

        if(data.Translations.length > 0){
            let tbody = document.createElement('tbody')
            for(let i = 0; i < data.Translations.length; i++){
                let r = data.Translations[i]
                let tr = document.createElement('tr')
                let td1 = document.createElement('td')
                let td2 = document.createElement('td')
                td1.innerHTML = r.Source
                td2.innerHTML = r.Dest
                tr.appendChild(td1)
                tr.appendChild(td2)
                tbody.appendChild(tr)
            }
            tblTrans.appendChild(tbody)    
        }else{
            let tfoot = document.createElement('tfoot')
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            td.setAttribute('colspan', '2')
            td.innerHTML = 'No words found in selected category'
            tr.appendChild(td)
            tfoot.appendChild(tr)
            tblTrans.appendChild(tfoot) 
        }      
    }
    catch(err){
        console.error(err)
    }
}

function clearTable(){
    tblTrans.innerHTML = ''
}

divSwapLang.addEventListener('click', (e) => {
    let sourceLangId = selSourceLang.options[selSourceLang.selectedIndex].value
    let destLangId = selDestLang.options[selDestLang.selectedIndex].value
    let swapId = destLangId
    destLangId = sourceLangId
    sourceLangId = swapId
    selSourceLang.value = sourceLangId
    selDestLang.value = destLangId

    getTranslations()
})