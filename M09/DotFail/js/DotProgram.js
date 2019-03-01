// JavaScript source code
var DrawButton = document.querySelector("#DrawBtn");
var clearButton = document.querySelector("#clear");
var myDrawArea = document.getElementById("DrawArea");
var redBox = document.getElementById("RedColorText");
var greenBox = document.getElementById("GreenColorText");
var blueBox = document.getElementById("BlueColorText");
var colorBar = document.getElementById("ColorBar");

DrawButton.addEventListener("click", DrawDotHandler, false);
clearButton.addEventListener("click", clearHandler, false);

// and a mouse click handler.
addEventListener("click", DrawDotHandler, false);

// GLOBAL ACTIONS:
//-----------------------------------------------------
window.addEventListener("load", init);

var GDot = "";  // will be our dot element

// init:
function init() {
    // set up the initial dot and add to draw area.  
    // it wont show since its color is the same as the DrawArea background.
    GDot = document.createElement("div");

    console.log("GDot:  " + GDot)
    GDot.className = "dot";

    myDrawArea.appendChild(GDot);

}// end init


// Draw button was clicked or a mouse click on area.
function DrawDotHandler(e) {

    var r = 0;
    var g = 0;
    var b = 0;
    var redInput = 0;
    var greenInput = 0;
    var blueInput = 0;

    redInput = document.querySelector("#RedColorText");
    r = parseInt(redInput.value);

    greenInput = document.querySelector("#GreenColorText");
    g = parseInt(greenInput.value);

    blueInput = document.querySelector("#BlueColorText");
    b = parseInt(blueInput.value);

    console.log("rgb: " + r + " " + g + " " + b);
    console.log("eventX: " + e.pageX + ", eventY: " + e.pageY + ", Draw AreaX: " + myDrawArea.offsetLeft + ", AreaY: " + myDrawArea.offsetTop);
    console.log("Draw Area width: " + myDrawArea.style.width + ", Area height: " + myDrawArea.style.height); // these are sadly undefined.

    console.log("Draw Area left: " + myDrawArea.left + ", Area top: " + myDrawArea.top);  // these are sadly undefined.

    // validate position for next dot.  make sure we are in our drawing area.
    // note, because element.style. well anything,  doesn't seem to be filled in, we are hard coding
    // based on current style sheet for width and height of Draw Area as well as 1/2 size of dot.


    console.log( ",  client X: " + e.clientX + ", client Y: " + e.clientY);

    /*
    if (e.relatedTarget.tagName === "DrawArea")
        e.clientX, e.clientY
*/
    console.log(e);
    console.log(e.target.id + " " + e.layerX + " " + e.layerY);

    switch (e.target.id) {

        case "RedColorText":
            if (validate(r)) {
                e.target.backgroundColor = "red"; //"rgb(" + r + ", 0, 0)";
            }
            break;

    }// end switch



    if (e.target.id === "DrawArea")  // if we are in the draw area and not overlapping another dot.
    {
        if (((e.layerX - 4) > e.target.offsetLeft) &&
            ((e.layerY - 4) > e.target.offsetTop) &&
            ((e.layerX + 4) < (e.target.offsetLeft + 200)) &&
            ((e.layerY + 4) < (e.target.offsetTop + 100))

        ) {


            // validate the input values
            if (validate(r) && validate(g) && validate(b)) {

                console.log("about to remove child... GDot: " + GDot);

                // make sure to clear the previous dot then draw the dot.
                myDrawArea.removeChild(GDot);

                // ok, should be inside Draw area.
                GDot.style.left = (e.layerX - 4) + "px";
                GDot.style.top = (e.layerY - 4) + "px";

                // set new color for GDot
                GDot.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
                myDrawArea.appendChild(GDot);  // add back to DrawArea

            }// end if colors valid
            else {
                alert("You must enter a number from 0 to 255 for each color!");
                clear();
            }
        } // end if inside draw area
    }// end if target is DrawArea

}// end DrawDotHandler


function validate(n) {
    if (n < 0 || n > 255 || isNaN(n)) {
        // bad input
        return false;
    }
    else {
        return true;
    }
}// end validate

function clearHandler(e) {
    clear();
}


function clear() {
    // clear colorbar and set input text values to 000
    myDrawArea.style.backgroundColor = "white";
    GDot.style.backgroundColor = "white";

    // set color input boxes to 000
    document.getElementById("RedColorText").value = "xxx";
    document.getElementById("GreenColorText").value = "xxx";
    document.getElementById("BlueColorText").value = "xxx";

}


// convert single  rgb (0 to 255) value to hex
function rgbToHex(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

// convert a full set of rgb to hex
function fullColorHex(r, g, b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red + green + blue;
}