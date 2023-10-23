const listItem = document.querySelector(".listitem").cloneNode(true);
document.querySelector(".listitem").remove();
const listContainer = document.querySelector(".listcontainer").cloneNode(true);
document.querySelector(".listcontainer").remove();

let listElements = [];
let lists = [];


// create new object type called list
function List() {
    //has a list name and an array of ListItems
    this.name = "";
    this.items = [];
}

function ListItem() {
    // constructor for list item
    // has a boolean isChecked and a string name
    this.isChecked = "";
    this.name = "";
}
// load lists from local storage, if the key exists
if(localStorage.getItem("lists")){
    loadLists();
    console.log("lists loaded from local storage");
}

document.querySelector(".listscontainer").addEventListener("click", (e) => {
    if (e.target.classList.contains("addnewlist")) {
        const newList = listContainer.cloneNode(true);
        appendList(newList);
        saveLists();
    }
    else if(e.target.classList.contains("addnewitem")){
        e.target.parentElement.insertBefore(listItem.cloneNode(true), e.target);
    }
    else if(e.target.classList.contains("remove")){
        listElements.splice(listElements.indexOf(e.target.parentElement), 1);
        e.target.parentElement.remove();
        saveLists();
    }
});

document.querySelector(".removeall").addEventListener("click", (e) => {
    console.log("remove all")
    localStorage.removeItem("lists");
    listElements.forEach((listElement) => {
        listElement.remove();
    });
    listElements = [];
    lists = [];
});


document.addEventListener("input", (e) => {
    saveLists();
});

// turn any list element to a List object
function listToObj(listElement){
    const list = new List();
    list.name = listElement.querySelector(".listtitle").value;
    const items = [];
    listElement.querySelectorAll(".listitem").forEach((item) => {
        if(item.classList.contains("addnewitem")) return;
        const _listItem = new ListItem();
        _listItem.name = (item.querySelector(".itemname").value);
        _listItem.isChecked = (item.querySelector(".itemcheckbox").checked);
        items.push(_listItem);
    });
    list.items = items;
    return list;
}

// turn any List object to a list element
function objToList(list){
    const listElement = listContainer.cloneNode(true);
    listElement.querySelector(".listtitle").value = list.name;
    list.items.forEach((item) => {
        const _listItem = listItem.cloneNode(true);
        _listItem.querySelector(".itemname").value = item.name;
        _listItem.querySelector(".itemcheckbox").checked = item.isChecked;
        listElement.querySelector(".list").insertBefore(_listItem, listElement.querySelector(".addnewitem"));
    });
    return listElement;
}

// save lists to local storage
function saveLists(){
    localStorage.clear();
    lists = [];
    listElements.forEach((listElement) => {
        lists.push(listToObj(listElement));
    });
    localStorage.setItem("lists", JSON.stringify(lists));
    console.log("lists saved to local storage");
}

// load lists from local storage
function loadLists(){
    lists = JSON.parse(localStorage.getItem("lists"));
    lists.forEach((list) => {
        appendList(objToList(list));
    });
}

function appendList(newList){
    document.querySelector(".listscontainer").insertBefore(newList, document.   querySelector("#addnewlist"));
    listElements.push(newList);
}