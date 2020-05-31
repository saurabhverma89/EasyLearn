const selCategory = document.getElementById('selCategory')
const tbodyWord = document.getElementById('tbodyWord')
const tfootWord = document.getElementById('tfootWord')

selCategory.addEventListener('change', (e) => {
    getWords()
})

async function getWords(){
    clearTable()
    const categoryId = selCategory.options[selCategory.selectedIndex].value
    if(categoryId != ""){
        try{
            const res = await fetch(`/word/getWordsByCategory/${categoryId}`)
            const jsonRes = await res.json()
            if(!res.ok){
                if(res.status == '404'){
                    tfootWord.style.display = 'table-footer-group'
                }
                throw jsonRes
            }
            else{
                showWords(jsonRes)
            }
        }catch(err){
            console.log(err.message)
        }
    }
}

function showWords(data){
    try{
        console.log(data)
        if(data.length > 0){
            for(let i = 0; i < data.length; i++){
                let r = data[i]
                let tr = document.createElement('tr')
                let td1 = document.createElement('td')
                let td2 = document.createElement('td')
                let td3 = document.createElement('td')
                let td4 = document.createElement('td')
                td1.innerHTML = (i+1)
                td1.className  = 'text-center'
                td2.innerHTML = r.WordText
                td3.innerHTML = '<a href="/word/edit/'+ data[i]._id +'" title="Edit"><i class="fa fa-pencil" aria-hidden="true"></i></a>'
                td3.className  = 'text-center'
                td4.innerHTML = '<a href="/word/delete/'+ data[i]._id +'" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></a>'
                td4.className  = 'text-center'
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tbodyWord.appendChild(tr)
            }
        }
        else{
            
        }      
    }
    catch(err){
        console.error(err)
    }
}

function clearTable(){
    tbodyWord.innerHTML = ''
    tfootWord.style.display = 'none'
}
