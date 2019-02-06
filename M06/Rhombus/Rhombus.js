// JavaScript source code
"use strict";

// var rHeight =5;
// var colorEven = "orange";
// var colorOdd = "black";
// var symbol ="*";
window.addEventListener("load", init);  // so we can do some init stuff.



var EvenSelector = document.querySelector("#colorEven");
EvenSelector.addEventListener("input", showEvenColorHandler, false);

var OddSelector = document.querySelector("#colorOdd");
OddSelector.addEventListener("input", showOddColorHandler, false);


function init() {
    // set the initial colors in the colorboxes so they show.
    showEvenColorHandler();
    showOddColorHandler();
}

function showEvenColorHandler() {
    var colorInput = "";
    var colorSelector = document.getElementById("colorEven");
    if (colorSelector != null) {
        colorInput = colorSelector.options[colorSelector.selectedIndex].value;
    }

   EvenColorPic.style.backgroundColor = colorInput;
}


function showOddColorHandler() {
    var colorInput = "";
    var colorSelector = document.getElementById("colorOdd");
    if (colorSelector != null) {
        colorInput = colorSelector.options[colorSelector.selectedIndex].value;
    }

    OddColorPic.style.backgroundColor = colorInput;
}



function createRhombus(pHeight, pColorEven, pColorOdd, pSymbol) {
    upRight(pHeight, pColorEven, pColorOdd, pSymbol);
    downRight(pHeight, pColorEven, pColorOdd, pSymbol);

}

function upRight(pHeight, pColorEven, pColorOdd, pSymbol) {
    var rLine = "";

    // NOTE:  this doesn't seem to work.  this backgroundColor prop is never set via the .css 
    // though it works via the .css.  If you set this style.backgroundColor, it will override the css file
    // and show the color.  Unfortunately it doesn not initially have the actual background color.
    var backColor = document.querySelector("body").style.backgroundColor;

    backColor = "white";  // setting to white for now.

   // var startPosition = pHeight;;  // when to actually start printing color for this line
    var i = 0;
    var j = 0;
    var z = 0;

    for (i = 0; i < pHeight; i++) {
        rLine += "<p>";
       

 
        //console.log("upright startPosition = " + startPosition + "  i = " + i);

        // first go out to the start Color position:  Works best for odd heights but ok for even.
      /*  for (z = 0; z < startPosition; z++) {
            rLine += "<span style='color:" + backColor + ";'>" + pSymbol + "</span>";
        }
        */

        // now at the right position to start printing.

        //Create each line on the Rhombus
        for (j = 0; j <= (2*i); j++) {

            //Is the position even or odd so we change the color
            if (j % 2)
                //even
                rLine += "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
            else
                //odd
                rLine += "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";

        }
        rLine += "</p>";
        // console.log(rLine);

       // startPosition -= 1; // decrement by 1
    }

    document.getElementById("upRight").innerHTML = rLine;
}

function downRight(pHeight, pColorEven, pColorOdd, pSymbol) {
    var rLine = "";
    //var startPosition = 1;  // when to actually start printing color for this line

    // NOTE:  this doesn't seem to work.  this backgroundColor prop is never set via the .css 
    // though it works via the .css.  If you set this style.backgroundColor, it will override the css file
    // and show the color.  Unfortunately it doesn not initially have the actual background color.
    var backColor = document.querySelector("body").style.backgroundColor;

    backColor = "white";  // setting to white for now.

    var i = 0;
    var j = 0;
    var z = 0;

    console.log("backColor = " + backColor);
   

    for (i = (pHeight-1); i > -1; i--) {
        rLine += "<p>";

        
        //console.log("downright startPosition = " + startPosition + "  i = " + i);

        // now at right position to start printing

        // first go out to the start Color position:  Works best for odd heights but ok for even.
   /*     for (z = 0; z < startPosition; z++) {
            rLine += "<span style='color:" + backColor + ";'>" + pSymbol + "</span>";
        }
*/

        //Create each line on the Rhombus
        for (j = 0; j <= (2*i); j++) {

            //Is the position even or odd so we change the color
            if (j % 2)
                //even
                rLine += "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
            else
                //odd
                rLine += "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";

        }
        rLine += "</p>";
        // console.log(rLine);

        //startPosition += 1; // increment by 1
    }// end for i

    document.getElementById("downRight").innerHTML = rLine;
}

