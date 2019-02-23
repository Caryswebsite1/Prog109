/*// Create a new element and store it in a variable.var newEl = document.createElement('li');// Create a text node and store it in a variable.var newText = document.createTextNode('quinoa');// Attach the new text node to the new element.newEl.appendChild(newText);// Find the position where the new element should be added.var position = document.getElementsByTagName('ul')[0];// Insert the new element into its position.position.appendChild(newEl);*/// HW 8 assignment: // add input text and input button at bottom of current list. // change original code above into part of the button on click function.// first set up variable for the input and the button:let addItemBtn = document.getElementById("addButton");// add event listner for button:addItemBtn.addEventListener("click", AddNewItem, false);

// code up the new function:
//-----------------------------------------------------------------------
// AddNewItem:  Called by addButton click event
//
// Gets the text from the newItem input box and adds it to the main list.
// Validation of the existance of the input is done.
// After addition, the input field is cleared to avoid accidental double adds by user.
//-----------------------------------------------------------------------
function AddNewItem() {

    // get the new element text from the input and make sure its ok...
    let newInput = document.getElementById("newItemInput");
    let newItemText = "";

    if (newInput !== null) {
        newItemText = newInput.value;
    }

    // check if input not null or blank to continue.
    if (newItemText !== "" && newItemText !== null) {
        // input probably ok.

        // then basically all the old code:
        // Create a new element and store it in a variable.        let newEl = document.createElement('li');        // Create a text node, with the new item text, and store it in a variable.        let newTextEl = document.createTextNode(newItemText);        // Attach the new text node to the new element.        newEl.appendChild(newTextEl);        // Find the position where the new element should be added.        let position = document.getElementsByTagName('ul')[0];        // Insert the new element into its position.        position.appendChild(newEl);        // reset input value to nothing to avoid accidental multiple adds by user.        newInput.value = "";    }// end if input ok



}// end AddNewItem

