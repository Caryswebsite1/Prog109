// JavaScript source code

// init table var to not a number to start.
var table = NaN;    // init to not a number

// ask for a number input for the multiplication factor
table = prompt("Please input a number:");

// check if user clicked cancel (returns null) then check that we actually got a number 
// and if not, say so and ask again until we get a number.
while (table !== null && isNaN(table) ) {
    table = prompt("That was not a number!  Please input a number:")
} //end while 

// NOTE:  if user hit cancel, then table = null.  Resulting multiplication table will show null.
// Thats ok. just want to let user out of loop if they hit cancel.

var i = 1;     // initalize while loop counter to 1
var msg = '<h2>Multiplication Table</h2>';   // initalize the output message

// Do the multiplication
while (i < 11) {
    msg += i + ' x ' + table + ' = ' + (i * table) + '<br />';
    i++;
}


// Write the results into the page
var el = document.getElementById('blackboard');
el.innerHTML = msg;