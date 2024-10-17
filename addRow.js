const trButton = document.getElementById('trButton');
const btAddRow = document.getElementById('btAddRow');

btAddRow.addEventListener('click', ()=>{
    addRow();
})

const addRow = () => {
    const newTr = document.createElement('tr');

    const newTd1 = document.createElement('td');
    const newInfo = document.createElement('input');
    newInfo.type = 'text';
    newInfo.classList.add('tdInfo');
    newTd1.appendChild(newInfo);
    newTr.appendChild(newTd1);

    const newTd2 = document.createElement('td');
    const newQtd = document.createElement('input');
    newQtd.type='number';
    newQtd.classList.add('tdQtd');
    newTd2.appendChild(newQtd);
    newTr.appendChild(newTd2);

    const parent = trButton.parentNode;
    parent.insertBefore(newTr, trButton);
}