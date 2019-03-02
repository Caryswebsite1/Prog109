// JavaScript source code

var clearButton = document.querySelector("#clear");
var myDrawArea = document.getElementById("DrawArea");
var redBox = document.getElementById("RedColorText");
var greenBox = document.getElementById("GreenColorText");
var blueBox = document.getElementById("BlueColorText");

var radiusText = document.getElementById("RadiusText");

var colorBar = document.getElementById("ColorBar");

var errorBox = document.getElementById("ErrorDiv");  // so we can put out error messages.

// button event listener
clearButton.addEventListener("click", clearHandler, false);

// and a mouse click handler.
window.addEventListener("click", DrawDotHandler, false);

// and a overall key up handler to try to catch color box key inputs.
window.addEventListener("keyup", keyHandler, false);

/* **************************************************************
 * colorCheck:  called by handlers
 * 
 * Checks to see if color box inputs are all valid now.  if so
 * it returns true;
 * **************************************************************** */
function colorCheck() {
    var r = 0;
    var g = 0;
    var b = 0;
    var redInput = 0;
    var greenInput = 0;
    var blueInput = 0;
    var bValid = false;

    redInput = document.querySelector("#RedColorText");
    r = parseInt(redInput.value);

    greenInput = document.querySelector("#GreenColorText");
    g = parseInt(greenInput.value);

    blueInput = document.querySelector("#BlueColorText");
    b = parseInt(blueInput.value);

    if (validate(r) && validate(g) && validate(b)) {
        bValid = "rgb(" + r + "," + g + "," + b + ")";
    }

    return bValid;

}// end color check


/* **************************************************************
 * KeyHandler:  called by system for keyup event
 * 
 * Calls colorCheck to see if color box inputs are all valid now.  if so
 * it updates the color in the colorbar.
 * **************************************************************** */
 function keyHandler(theEvent) {

    console.log("in keyHandler.");
    var theTarget = theEvent.target;

    var bValid = colorCheck();  // check if colors are ok and returns valid color

    switch (theTarget.id) {

        case "RedColorText":
        case "GreenColorText":
        case "BlueColorText":
            console.log("in keyHandler, color text switch.");
            if (bValid != false) {
                colorBar.style.backgroundColor = bValid; 
                errorBox.innerHTML = "";  // clear previous error about colors
                console.log("just changed bar color");
            }
            break;

        case "RadiusText":
            // user is inputting a new radius value for the dot
            console.log("in keyhandler, radiusText switch.");
            if (!validateRadius(radiusText.value)) {
                errorBox.innerHTML = "Please enter a positive Radius value.";
            }
            else {
                errorBox.innerHTML = "";  // clear previous error about radius
            }
            break;

    }// end switch

}// end keyHandler




/* **************************************************************
 * DrawDotHandler:  called by system for mouse click event
 * 
 * Checks to see if mouse click was in draw area. Checks that color box 
 * inputs are all valid now.  If all that is true, then it creates and 
 * draws the dot.  if colors not good, pops an alert. 
 * **************************************************************** */
function DrawDotHandler(theEvent) {

    var theTarget = theEvent.target; 
    var radiusOffset = Math.round(radiusText.value / 2);

    console.log("radiusText.value is: " + radiusText.value);
    console.log("radius offset is: " + radiusOffset);

    var bValid = colorCheck();  // check if colors are ok and returns valid color
    var bRadiusOK = validateRadius(radiusText.value);  // check if current radius is ok.

    console.log("Radius OK is: " + bRadiusOK);

    console.log("rgb: " + bValid);
    console.log("eventX: " + theEvent.pageX + ", eventY: " + theEvent.pageY + ", Draw AreaX: " + myDrawArea.offsetLeft + ", AreaY: " + myDrawArea.offsetTop);
    console.log("Draw Area width: " + myDrawArea.style.width + ", Area height: " + myDrawArea.style.height); // these are sadly undefined.
    console.log("Draw Area left: " + myDrawArea.left + ", Area top: " + myDrawArea.top);  // these are sadly undefined.
    console.log(",  client X: " + theEvent.clientX + ", client Y: " + theEvent.clientY);

 
    console.log("here is the event:" + theEvent);
    console.log("here is the events target and layersx y" + theEvent.target.id + ", " + theEvent.layerX + ", " + theEvent.layerY);
    console.log(theEvent);

     // validate position for next dot.  make sure we are in our drawing area.
    if (theTarget.id === "DrawArea")  // if we are in the draw area and and radius size ok.
    {
        if (bValid === false) {
            errorBox.innerHTML = "Please enter a number from 0 to 255 for each Color.";
        }
        else if (!bRadiusOK) {
            errorBox.innerHTML = "Please enter a positive Radius value.";
        }
        else if (((theEvent.layerX - radiusOffset ) > theTarget.offsetLeft) &&
            ((theEvent.layerY - radiusOffset) > theTarget.offsetTop) &&
            ((theEvent.layerX + radiusOffset) < (theTarget.offsetLeft + theTarget.clientWidth)) &&
            ((theEvent.layerY + radiusOffset) < (theTarget.offsetTop + theTarget.clientHeight))

        ) {

            console.log("inside draw, checking bValid and bRadiusOK: " + bValid + ", " + bRadiusOK);
            errorBox.innerHTML = "";  // clear any previous error messages.


                console.log("inside if.  About to create and draw dot.");

                /* Creating a div with dot class. can have multiple on page */
                var dot = document.createElement("div");
                dot.className = "dot";
                dot.style.left = (theEvent.layerX - radiusOffset) + "px";
                dot.style.top = (theEvent.layerY - radiusOffset) + "px";
                dot.style.backgroundColor = bValid;
                dot.style.height = radiusText.value + "px";
                dot.style.width = radiusText.value + "px";
                dot.style.borderRadius = radiusOffset + "px";
                myDrawArea.appendChild(dot);
               
                console.log(dot);
        } // end if inside draw area
    }// end if target is DrawArea
    else if (theTarget.getAttribute("class") === "dot") {

        console.log("in hit dot if");
        // we hit a dot. stop event propagation or we can end up
        // with strange highlighting effects.
        /*****   This did not seem to work.  but putting a empty div just before
         * the draw area on the page did...  Why??
         */
        //theEvent.stopPropagation();
    }// end elseif

   // theEvent.stopPropagation();
}// end DrawDotHandler


/* **************************************************************
 * validate:  called by colorCheck
 * 
 * Checks to see if color given is valid.  if so returns true
 * 
 * **************************************************************** */
function validate(n) {
    if (n < 0 || n > 255 || isNaN(n)) {
        // bad input
        return false;
    }
    else {
        return true;
    }
}// end validate




/* **************************************************************
 * validateRadius:  called by keyup handler
 * 
 * Checks to see if radius given is valid.  if so returns true
 * 
 * **************************************************************** */
function validateRadius(n) {
    if (n <= 0 || n > 99 || isNaN(n)) {
        // bad input
        return false;
    }
    else {
        return true;
    }
}// end validateRadius



/* **************************************************************
 * clearHandler:  called by system on clear button hit
 * 
 * calls clear function then stops event propagation
 * 
 * **************************************************************** */
function clearHandler(theEvent) {
    clear();
    theEvent.stopPropagation();
}// end clearHandler


/* **************************************************************
 * clear:  called by handlers
 * 
 * sets draw area background to white, sets all color box values to white
 * sets color bar background to white, removes all child divs of the 
 * Draw Area to effectively clear all the dots.
 * 
 * **************************************************************** */
function clear() {
    // clear colorbar and set input text values to 000
    myDrawArea.style.backgroundColor = "white";
   // GDot.style.backgroundColor = "white";

    // set color input boxes and color bar to non values
    redBox.value = "xxx";
    greenBox.value = "xxx";
    blueBox.value = "xxx";

    radiusText.value = "xx";

    colorBar.style.backgroundColor = "white";

    errorBox.innerHTML = "";

    // clear out all dots from draw area

    var element = myDrawArea.getElementsByTagName("div");

    for (index = element.length - 1; index >= 0; index--) {

        element[index].parentNode.removeChild(element[index]);
    }// end for
 
 
}// end clear


