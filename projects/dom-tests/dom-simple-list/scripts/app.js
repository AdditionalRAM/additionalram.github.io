const list = document.querySelector("#mylist");
const h2 = document.querySelector("h2");

let buttons = document.querySelectorAll(".list-item .closebutton");
console.log(buttons);

// buttons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     console.log(e.target);
//     e.target.parentElement.remove();
//   });
// });

//delete a list item
list.addEventListener("click", (e) => {
    if(e.target.className == "closebutton"){
        const li = e.target.parentElement;
        li.remove();
    }
});

const addForm = document.forms["add"];

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = addForm.querySelector('input[type="text"]').value;
    addForm.querySelector('input[type="text"]').value = "";
    // console.log(value)

    //create elements
    const li = document.createElement('li');
    const btn = document.createElement("button");
    const name = document.createElement('p');

    //add content
    name.textContent = value;
    btn.textContent = "Close";

    //add styling
    li.classList.add('list-item');
    btn.classList.add("closebutton");

    //append to document
    li.appendChild(name);
    li.appendChild(btn);
    list.appendChild(li);
});

//hide books
const hideBox = document.querySelector("#hide");
hideBox.addEventListener("change", (e) => {
    if(hideBox.checked){
        list.style.display = "none";
    }else list.style.display = "initial";
});

//search functionality
const searchBar = document.querySelector("#searchinput");
searchBar.addEventListener("input", (e) => {
    //case insensitive
    let inputValue = searchBar.value.toLowerCase();
    Array.from(list.children).forEach((child) => {
        //if value doesnt include set display to none
        if(!child.querySelector("p").textContent.toLowerCase().includes(inputValue)){
            child.style.display = "none";
        }else{
            child.style.display = "flex";
        }
    });
});