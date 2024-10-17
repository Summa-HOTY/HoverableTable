let sessionColorList = ['red','green','yellow','purple', 'sunset orange', 'orange', 'pink'];
const isDefaultColorList = true;

const rowCountInput = document.getElementById('rowCount');
const columnCountInput = document.getElementById('columnCount');
const timeOutInput = document.getElementById('timeOut');
const cyclesInput = document.getElementById('cycles');
const colorPickerInput = document.getElementById('colorPicker');

const addColorButton = document.getElementById('addColorBtn');
const emptyColorListButton = document.getElementById('emptyColorsBtn');
const generateTableButton = document.getElementById('generateBtn');

const partyButton = document.getElementById('partyBtn');

addColorButton.onclick = function () {
    if (isDefaultColorList) sessionColorList = [];
    sessionColorList.push(colorPickerInput.value);
}

emptyColorListButton.onclick = function () {
    sessionColorList = [];
}

generateTableButton.onclick = function () {
    Generate(rowCountInput.value, columnCountInput.value, timeOutInput.value, cyclesInput.value, sessionColorList);
}

partyButton.onclick = function () {
    PartyGenerate(rowCountInput.value, columnCountInput.value, timeOutInput.value, cyclesInput.value, sessionColorList);
}

function Generate(tableHeight, tableWidth, timeOut, cycles, colorList) {
    const table = document.getElementById('MainTable');
    table.innerHTML = '';

    for (let i = 0; i < tableHeight; i++) {
        const row = document.createElement('tr');

        for (let y = 0; y < tableWidth; y++) {
            const column = document.createElement('td');
            column.onmouseenter = function () { HandleMouseEvent(column, timeOut, cycles, colorList); }

            row.appendChild(column);
        }

        table.appendChild(row);
    }
}


function PartyGenerate(tableHeight, tableWidth, timeOut, cycles, colorList) {
    let partyColumns = [];

    const table = document.getElementById('MainTable');
    table.innerHTML = '';

    for (let i = 0; i < tableHeight; i++) {
        const row = document.createElement('tr');

        for (let y = 0; y < tableWidth; y++) {
            const column = document.createElement('td');
            partyColumns.push(column);

            row.appendChild(column);
        }

        table.appendChild(row);
    }

    partyColumns = shuffle(partyColumns);

    partyColumns.forEach(column => {
        PartyColumn(column, timeOut, cycles, colorList);
    })
}

function HandleMouseEvent(column, timeOut, cycles, colorList) {
    let index = 0;

    for (let i = 0; i < cycles; i++) {
        colorList.forEach(color => {
            setTimeout(function () {
                column.style.backgroundColor = color;
                column.style.borderColor = color;
            }, timeOut * index);
            
            index++;
        });
    }        

    setTimeout(function () {
        column.style.backgroundColor = colorList[0];
        column.style.borderColor = colorList[0];
    }, timeOut * index);
}

function PartyColumn(column, timeOut, cycles, colorList) {
    colorList = shuffle(colorList);
    let index = 0;

    for (let i = 0; i < cycles; i++) {
        colorList.forEach(color => {
            setTimeout(function () {
                column.style.backgroundColor = color;
                column.style.borderColor = color;
            }, timeOut * index);
            
            index++;
        });
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}
