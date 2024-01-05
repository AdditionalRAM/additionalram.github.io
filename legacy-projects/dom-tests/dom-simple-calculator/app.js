let container = document.querySelector('.container');
const display = document.querySelector('#display');
const result = document.querySelector('#result');

const states = ["empty", "entering", "result"];
const arrow = {
    display: {left: document.querySelector('#displayleftarrow'), right: document.querySelector('#displayrightarrow')},
    result: {left: document.querySelector('#resultleftarrow'), right: document.querySelector('#resultrightarrow')}
}
let state = states[0];

let operation = "";


display.textContent = '...';
result.textContent = '';

let displayOffset = 0;
let resultOffset = 0;

function updateArrows(){
    // offset operation so it fits into 20 characters of display
    //example : if operation is 30000 and offset is 2, then operation is 000
    //if operation is 30000 and offset is -2 then operation is 0030000
    display.textContent = operation.substring(displayOffset, displayOffset+16);
    
    if(operation.length > 16){
        arrow.display.left.classList.remove("hide");
        arrow.display.right.classList.remove("hide");
    }else{
        arrow.display.left.classList.add("hide");
        arrow.display.right.classList.add("hide");
    }
    if(result.textContent.length > 20){
        arrow.result.left.classList.remove("hide");
        arrow.result.right.classList.remove("hide");
    }else{
        arrow.result.left.classList.add("hide");
        arrow.result.right.classList.add("hide");
    }
    //if display is offset to the left all the way, hide left arrow
    if(displayOffset == 0){
        arrow.display.left.classList.add("hide");
    }
    else{
        arrow.display.left.classList.remove("hide");
    }
    //if display is offset to the right all the way, hide right arrow
    if(operation.length - displayOffset <= 16){
        arrow.display.right.classList.add("hide");
    }
    else{
        arrow.display.right.classList.remove("hide");
    }
}

function onButtonClick(value){
    if(display.textContent === '...'){
        display.textContent = '';
        result.textContent = '';
        state = states[1];
    }
    else if (state === states[2]){
        result.textContent = '';
        state = states[1];
    }
    if(value === '#'){
        display.textContent = '...';
        operation = '';
        result.textContent = '';
        state = states[0];
    }
    else if(value === '='){
        result.textContent = eval(operation);
        state = states[2];
        if(operation.length > 16)
        displayOffset = operation.length - 16;
    }
    else
    {
        operation += value;
        if(operation.length > 16)
        displayOffset = operation.length - 16;
    }
    updateArrows();
}

container.addEventListener('click', function(event){
    if(event.target.classList.contains('calcbutton')){
        onButtonClick(event.target.textContent);
    }
    else if(event.target.classList.contains("arrow") && event.target.classList.contains("display")){
        if(event.target.textContent == "<"){
            displayOffset--;
        }
        else{
            displayOffset++;
        }
        updateArrows();
    }
});

updateArrows();