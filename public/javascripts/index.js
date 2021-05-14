const selSourceLang = document.getElementById('selSourceLang')
const selDestLang = document.getElementById('selDestLang')
const selCategory = document.getElementById('selCategory')
const tblTrans= document.getElementById('tblTrans')
const divSwapLang = document.getElementById('divSwapLang')
const myLanguageId = document.getElementById('h_myLanguageId').value
const tableBox = document.getElementsByClassName('my-table-box')[0]
const loader = document.getElementsByClassName('loader')[0]

Init()

function Init(){
    HideTableBox()
    HideLoader()
}

function HideTableBox(){
    tableBox.style.display = 'none'
}

function ShowTableBox(){
    tableBox.style.display = 'block'
}

function HideLoader(){
    loader.style.display = 'none'
}

function ShowLoader(){
    loader.style.display = 'block'
}

selSourceLang.addEventListener('change', (e)  => {
    getTranslations()
})

selDestLang.addEventListener('change', (e) => {
    getTranslations()
})

selCategory.addEventListener('change', (e) => {
    getTranslations()
})

async function getTranslations(){
    clearTable()
    const categoryId = selCategory.options[selCategory.selectedIndex].value
    const sourceLangId = selSourceLang.options[selSourceLang.selectedIndex].value
    const destLangId = selDestLang.options[selDestLang.selectedIndex].value
    if(categoryId != "" && sourceLangId != "" && destLangId != ""){
        try{
            ShowTableBox()
            ShowLoader()
            const res = await fetch(`/getTranslation/${categoryId}/${sourceLangId}/${destLangId}/${myLanguageId}`)
            const jsonRes = await res.json()
            if(!res.ok){
                throw jsonRes
            }
            else{
                showTranslations(jsonRes)
            }
        }catch(err){
            console.log(err.message)
        }
        finally{
            HideLoader()
        }
    }
}

function showTranslations(data){
    try{
        let thead = document.createElement('thead')
        let thead_tr = document.createElement('tr')
        let thead_tr_thSource = document.createElement('th')
        let thead_tr_thDesc = document.createElement('th')
        
        thead_tr_thSource.innerHTML = `${data.SearchCriteria.SourceLanguageTrans} (${data.SearchCriteria.SourceLanguageCode})`
        thead_tr_thDesc.innerHTML = `${data.SearchCriteria.DestLanguageTrans} (${data.SearchCriteria.DestLanguageCode})`
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