const btnTranslate = document.getElementById('btnTranslate')
const chkLanguage = document.getElementsByClassName('chk-language')
const txtText = document.getElementById('txtText')
const chkLang_selectAll = document.getElementById('chkLang_selectAll')
let languageSelected = []

Init()

function Init(){
    HideTableBox()
    HideLoader()
    Array.from(chkLanguage).forEach(x => {
        x.addEventListener('click', (e) => {
            ToggleSelecAll(x)
        })
    })
}

btnTranslate.addEventListener('click', e => {
    getTranslations()
})

function getSelectedLanguages(){
    languageSelected = []
    Array.from(chkLanguage).forEach(c => {
        if(c.checked){
            const languageCode = c.value.split('-')[0]
            const languageName = c.value.split('-')[1]
            languageSelected.push({
                LanguageCode: languageCode,
                LanguageName: languageName
            })
        }
    })
}

function getSelectedLanguageCodes(){
    return languageSelected.map(x=>x.LanguageCode).join()
}

async function getTranslations(){
    clearTable()
    getSelectedLanguages()
    const languageCodes = getSelectedLanguageCodes()
    const text = txtText.value
    if(languageSelected.length == 0 || text == ''){
        return
    }
    try{
        ShowTableBox()
        ShowLoader()
        
        const res = await fetch(`/translateOneToMany/${text}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: `languageCodes=${languageCodes}`
        })
        const jsonRes = await res.json()
        if(!res.ok){
            throw jsonRes
        }
        else{
            showTranslations(jsonRes)
        }
    }catch(err){
        console.error(err.message)
    }
    finally{
        HideLoader()
    }
}

function showTranslations(res){
    try{
        let thead = document.createElement('thead')
        let thead_tr = document.createElement('tr')
        let thead_tr_thLanguage = document.createElement('th')
        let thead_tr_thTranslation = document.createElement('th')

        thead_tr_thLanguage.innerHTML = `Language`
        thead_tr_thTranslation.innerHTML = `Translation`

        thead_tr.appendChild(thead_tr_thLanguage)
        thead_tr.appendChild(thead_tr_thTranslation)
        thead.appendChild(thead_tr)
        tblTrans.appendChild(thead)

        let tbody = document.createElement('tbody')
        for(let i = 0; i < res.length; i++){
            let r = res[i]
            let tr = document.createElement('tr')
            let td0 = document.createElement('td')
            let td1 = document.createElement('td')
            td0.innerHTML = languageSelected.find(x=> x.LanguageCode == r.LanguageCode).LanguageName
            td1.innerHTML = r.Translation
            
            tr.appendChild(td0)
            tr.appendChild(td1)
            tbody.appendChild(tr)
        }
        tblTrans.appendChild(tbody)
    }
    catch(err){
        console.error(err)
    }
}

chkLang_selectAll.addEventListener('click', e => {
    Array.from(chkLanguage).forEach(x => {
        x.checked = chkLang_selectAll.checked
    })
})

function ToggleSelecAll(chk){
    chkLang_selectAll.checked = chkLanguage.length == GetSelectedCheckboxes().length
}

function GetSelectedCheckboxes(){
    let checkBoxes = []
    Array.from(chkLanguage).forEach(x => {
        if(x.checked){
            checkBoxes.push(x)
        }
    })
    return checkBoxes
}