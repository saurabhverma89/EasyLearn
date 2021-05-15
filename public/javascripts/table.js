const tableBox = document.getElementsByClassName('my-table-box')[0]
const tblTrans = document.getElementById('tblTrans')

function HideTableBox(){
    tableBox.style.display = 'none'
}

function ShowTableBox(){
    tableBox.style.display = 'block'
}

function clearTable(){
    tblTrans.innerHTML = ''
}