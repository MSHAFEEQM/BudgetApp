//select all elements
const balanceEl = document.querySelector(".balance .value")
const incomeTotalEl = document.querySelector(".income-total")
const outcomeTotalEl = document.querySelector(".outcome-total")
const incomeEl = document.querySelector("#income")
const expenseEl = document.querySelector("#expense")
const allEl = document.querySelector("#all")
const incomeListEl = document.querySelector("#income .list")
const expenseListEl = document.querySelector("#expense .list")
const allListEl = document.querySelector("#all .list")

//select toggle buttons

const expenseToggle = document.querySelector(".tab1")
const incomeToggle = document.querySelector(".tab2")
const allToggle = document.querySelector(".tab3")

//add input feilds

const addIncomeBtn = document.querySelector(".add-income")
const incomeTitle = document.querySelector("#income-title-input")
const incomeAmount = document.querySelector("#income-amount-input")

const addExpenseBtn = document.querySelector(".add-expense")
const expenseTitle = document.querySelector("#expense-title-input")
const expenseAmount = document.querySelector("#expense-amount-input")

//variables

let ENTRY_LIST ;

let balance = 0, income = 0, expense = 0;
//Initial setup

ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];

updateUI();

//Toggling

expenseToggle.addEventListener('click', function () {
    show(expenseEl);
    hide([incomeEl, allEl]);
    active(expenseToggle);
    inactive([incomeToggle, allToggle]);
})
incomeToggle.addEventListener('click', function () {
    show(incomeEl);
    hide([allEl, expenseEl]);
    active(incomeToggle);
    inactive([expenseToggle, allToggle]);
})
allToggle.addEventListener('click', function () {
    show(allEl);
    hide([incomeEl, expenseEl]);
    active(allToggle);
    inactive([incomeToggle, expenseToggle]);
})

//Toggle functions

function show(element) {
    element.classList.remove("hide");
}
function hide(elements) {
    elements.forEach(element => {
        element.classList.add("hide");
    });
}
function active(element) {
    element.classList.add("active");
}
function inactive(elements) {
    elements.forEach(element => {
        element.classList.remove("active");
    });
}

//add expense

addExpenseBtn.addEventListener('click', function () {

    if (!expenseAmount.value || !expenseTitle.value) return;

    let expense = {
        type: "expense",
        title: expenseTitle.value,
        amount: expenseAmount.value

    }
    ENTRY_LIST.push(expense);
    updateUI();
    clearInputs([expenseAmount, expenseTitle]);
});

//addincome

addIncomeBtn.addEventListener('click', function () {

    if (!incomeAmount.value || !incomeTitle.value) return;

    let income = {
        type: "income",
        title: incomeTitle.value,
        amount: incomeAmount.value

    }
    ENTRY_LIST.push(income);
    updateUI();
    clearInputs([incomeAmount, incomeTitle]);
});

incomeListEl.addEventListener("click",deleteOrEdit);
expenseListEl.addEventListener("click",deleteOrEdit);
allListEl.addEventListener("click",deleteOrEdit);

function deleteOrEdit(event){

    const targetBtn = event.target;
    const entry = targetBtn.parentNode;

    if(targetBtn.id == "delete"){
        deleteEntry(entry);
        
    }else if(targetBtn.id == "edit"){
        editEntry(entry);
        
    }
}

function deleteEntry(entry){
    ENTRY_LIST.splice(entry.id,1);
    updateUI();
}
function editEntry(entry){

    let ENTRY = ENTRY_LIST[entry.id];

    if(ENTRY.type == "income"){
        incomeTitle.value = ENTRY.title;
        incomeAmount.value = ENTRY.amount;
    }else if(ENTRY.type == "expense"){
        expenseTitle.value = ENTRY.title;
        expenseAmount.value = ENTRY.amount;
    }
    deleteEntry(entry);
}
//Main functions

function updateUI() {

    income = calcTotal("income", ENTRY_LIST);
    expense = calcTotal("expense", ENTRY_LIST);
    balance = Math.abs(calcbalance(income, expense));

    let sign;

    if (income >= expense) {
        sign = "&#8377;";
        balanceEl.style.color = "#fff";
    } else {
        sign = "-&#8377;";
        balanceEl.style.color = "#f00";
    }

    balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
    incomeTotalEl.innerHTML = `<small>&#8377;</small>${income}`;
    outcomeTotalEl.innerHTML = `<small>&#8377;</small>${expense}`;

    clearElements([incomeListEl, expenseListEl, allListEl]);

    ENTRY_LIST.forEach((entry,index)=>{
        if(entry.type == "income"){
            showEntry(incomeListEl,entry.type,entry.title,entry.amount,index);
        }else if (entry.type == "expense"){
            showEntry(expenseListEl,entry.type,entry.title,entry.amount,index);
        }
        showEntry(allListEl,entry.type,entry.title,entry.amount,index);
    });

    updateChart(income,expense);

    localStorage.setItem("entry_list",JSON.stringify(ENTRY_LIST));

}

function showEntry(list,type,title,amount,id){

    const entry = `<li id ="${id}" class="${type}">
                    <div class="entry">${title} : &#8377;&nbsp;${amount}</div>
                    <div id="edit"></div>
                    <div id="delete"></div>
                    </li>`;
                    
    list.insertAdjacentHTML("afterbegin",entry);
    
    
}


function calcTotal(type, list) {
    let sum = 0;
    list.forEach(entry => {
        if (entry.type == type) {
            sum += parseInt(entry.amount);
        }
    })
    return sum;
}

function calcbalance(income, expense) {
    return income - expense;
}

function clearElements(elements) {
    elements.forEach(element => {
        element.innerHTML = "";
    });
}

function clearInputs(inputs) {
    inputs.forEach(input => {
        input.value = "";
    })

}