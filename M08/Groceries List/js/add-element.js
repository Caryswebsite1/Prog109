

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
        // Create a new element and store it in a variable.



}// end AddNewItem
