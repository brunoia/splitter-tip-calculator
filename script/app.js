const bill = document.getElementById('inp-bill');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('inp-tip');
const people = document.getElementById('inp-people');
const errorMsg = document.querySelector('.error-msg');
const errorWrapper = document.querySelector('.error-wrapper');
const results = document.querySelectorAll('.value');
const resetBtn = document.querySelector('.reset');
const emptyColor = document.querySelector('.empty-reset-color');


bill.addEventListener('input', setBillValue);

tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});

tipCustom.addEventListener('input', setTipCustomValue);

people.addEventListener('input', setPeopleValue);

resetBtn.addEventListener('click', reset);


let billValue = 0; 
let tipValue = 0; 
let peopleValue = 0; 


function validateFloat(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
} 

function validadeInt(s) {
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
} 

function setBillValue() {
    if(bill.value.includes(',')) {
        bill.value = bill.value.replace(',', '.');
    }

    if(!validateFloat(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length-1);
    } 

    billValue = parseFloat(bill.value);

    calculateTip();

    emptyResetColor();
}



function handleClick(event) {
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');

        if(event.target.innerHTML == btn.innerHTML) {
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML) / 100; //%
        }
    });

    tipCustom.value = '';

    calculateTip();
}

function setTipCustomValue() {
    if(!validadeInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }

    tipValue = parseFloat(tipCustom.value) / 100;

    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    if(tipCustom.value !== '') {
        calculateTip();
    }

    emptyResetColor();
}

function setPeopleValue() {
    if(!validadeInt(people.value)) {
        people.value = people.value.substring(0, people.value.length-1);  
    }

    peopleValue = parseFloat(people.value);

    if(peopleValue <= 0) {
        errorMsg.classList.add('show-error-msg');
        errorWrapper.classList.add('show-error-wrapper');
        setTimeout(function() {
            errorMsg.classList.remove('show-error-msg');
            errorWrapper.classList.remove('show-error-wrapper');
        }, 2000);
    }

    calculateTip();

    emptyResetColor();
}

function calculateTip() {
    if(peopleValue >= 1) {
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    } else {
        results[0].innerHTML = '$0.00';
        results[1].innerHTML = '$0.00';
    }
}

function reset() {
    bill.value = '';
    setBillValue();


    tipCustom.value = '';
    setTipCustomValue();

    people.value = '';
    setPeopleValue();

    results[0].innerHTML = '$0.00';
    results[1].innerHTML = '$0.00';
}

function emptyResetColor() {
    if(bill.value === '' && tipCustom.value === bill.value && tipCustom.value === people.value) {
        emptyColor.classList.add('empty-reset-color');
    } else {
        emptyColor.classList.remove('empty-reset-color');
    }  
}