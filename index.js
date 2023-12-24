//Usage of:
//.. const, addEventListener(), innerHTML, input.value, function parameters, template strings, localStorage, The JSON object, object in arrays
let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveInputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("inputList-el");
const deleteInputBtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("save-btn");

//json.parse() -> string to object array
//json.stringify() -> object array to string

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        //listItems += "<li><a target='_blank' href' " + myLeads[i] + " '>" + myLeads[i] + "</a></li>";
        listItems += `
            <li>
                <a target='_blank' href="${leads[i]}"> 
                    ${leads[i]}  
                </a>
            </li>
    `;
    }
    ulEl.innerHTML = listItems;
}

saveTabBtn.addEventListener("click", function () {
    //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //})
    chrome.tabs.query({active: true, currentWindow: true }, function (tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

deleteInputBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

saveInputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})
