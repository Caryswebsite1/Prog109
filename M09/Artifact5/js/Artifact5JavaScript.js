"use strict";

// JavaScript source code
// Slideshow for Artifact 5, prog 109

//-----------------------------------------
//----- Global Image Array with captions

// NOTE: for arrays.  [ [], [] ] is an array whose first index only goes to 1 (0, 1) and the second index 
// can go as far as desired.  ie a 2 by infinite array.  a [[], [], []] creates a 3 by infinite and so on.
// a [ [ [], [] ] ] creates a 1 by 2 by infinte...  similarly [ [ [], [] ], [ [], [] ] ] creates a 2 by 2 by infinte.

// set up on load handler so we don't do anything till the page is loaded up.
window.addEventListener("load", init);  // force call to init function on load of page


// we need an array of 5 slides with 5 captions.  so a 5 by infinite will work fine.

const G_MainSlideArray = [[], [], [], [], []];  

const G_MainSlide = document.getElementById("MainSlide");
const G_MainCaption = document.getElementById("MainCaption");

const G_MaxIndex = 4;  // 5 slides only, 0 - 4. 
let G_SlideNum = 0;  // slide index tracker


let G_IntervalTimer = ""; // this will be the interval timer variable when it is set.

const G_WaitTime = 6000;  // time between slides in milliseconds  NOTE:  make sure this matches fade time!

// set up variable for buttons:
let BtnPrevious = document.getElementById("PrevBtn");
let BtnNext = document.getElementById("NextBtn");
let BtnResStop = document.getElementById("StopResume");

// disable buttons for now:
// make sure buttons are non operational till we enable in init function
BtnPrevious.disabled = true;
BtnPrevious.hidden = true;
BtnNext.disabled = true;
BtnNext.hidden = true;
BtnResStop.disabled = true;
BtnResStop.hidden = true;


// add event listeners for them:
BtnPrevious.addEventListener("click", previousHit, false);
BtnNext.addEventListener("click", nextHit, false);
BtnResStop.addEventListener("click", ResStopHit, false);


// load main array with images and captions  second index 0 is the image,
// second index 1 is the caption.
G_MainSlideArray[0][0] = "images/WaterfallCaveCropped373H.jpg";
G_MainSlideArray[0][1] = "A deep cave waterfall!";
G_MainSlideArray[1][0] = "images/LavaCave.jpeg";
G_MainSlideArray[1][1] = "Ouch! It's getting hot!";
G_MainSlideArray[2][0] = "images/JellyMonsterCaveCropped.jpg";
G_MainSlideArray[2][1] = "Ummm... Is that Slime on the walls MOVING??!!";
G_MainSlideArray[3][0] = "images/SkullWaterCaveMod.jpg";
G_MainSlideArray[3][1] = "I've got a bad feeling about this...";
G_MainSlideArray[4][0] = "images/MagicalGatewayCave.jpg";
G_MainSlideArray[4][1] = "The Gateway!";


// now set up init function then handlers

/* ******************************************************
 * init:
 * sets up the main image, enables the buttons, and starts the show.
 * ******************************************************* */
function init() {

    // make sure buttons are visable and operational
    BtnPrevious.disabled = false;
    BtnPrevious.hidden = false;
    BtnNext.disabled = false;
    BtnNext.hidden = false;
    BtnResStop.disabled = false;
    BtnResStop.hidden = false;


    // set starting slide number
    G_SlideNum = 0;

    // set up for static showing to start:
    G_MainSlide.setAttribute("class", "");
    G_MainSlide.style.opacity = 1;
    G_MainCaption.setAttribute("class", "");
    G_MainCaption.style.opacity = 1;

    // on slower connections, image loading time is causing a stutter effect first time through..
    // sooooo, trying something here to eliminate that. Kind of a preload effort for the images:

    let tempArray[] = [];

    for (i = 0; i <= G_MaxIndex; i++) {
        tempArray[i] = document.createElement("image");
        tempArray[i].setAttribute("src", G_MainSlide[i][0]);
    }
    // at this point, we have hopefully forced the load of the images without showing them...
    // we can throw the temp array away at the end of this function.


    ShowCurrentSlide();

   
}// end init



/* ******************************************************
 * ShowCurrentSlide()
 * Shows the current slide with caption.
 * ******************************************************* */
function ShowCurrentSlide() {
    console.log("in show slide.  current slide num: " + G_SlideNum);

    G_MainSlide.setAttribute("src", G_MainSlideArray[G_SlideNum][0]);

    console.log(G_MainSlide.getAttribute("src"));
    console.log(G_MainSlide.innerHTML);

    G_MainCaption.innerHTML = G_MainSlideArray[G_SlideNum][1];


    // if in slideshow running mode, then increment the slide for the next round.
    var buttonState = BtnResStop.getAttribute("data-State");
    if (buttonState === "Stop") {
        // currently running.
        // increment the slide counter and go around end if needed
        G_SlideNum += 1;
        if (G_SlideNum > G_MaxIndex) {
            G_SlideNum = 0;
        }
    }// end if

     
}// end ShowCurrentSlide




/* ******************************************************
 * ClearTimer()
 * Called to clear the timer.   
 * ******************************************************* */
function ClearTimer() {

    console.log("in ClearTimer");
    clearInterval(G_IntervalTimer);

}// end ClearTimer


// -------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//-------------------  HANDLERS -----------------------------------------------
//---------------------------------------------------------------------------------


/* ******************************************************
 * previousHit()
 * previous button was hit. 
 * ******************************************************* */
function previousHit() {

    // if in slideshow running mode, then the slide counter has already been incremented.
    // first stop the show via the button handler so button text and data will be reset.
    // then decrement once to get to correct start slide number then proceed as normal.
 
    var buttonState = BtnResStop.getAttribute("data-State");
    if (buttonState === "Stop") {
        // currently running.  call stop handler
        ResStopHit();

        // decrement counter by 1:
        G_SlideNum -= 1;
        if (G_SlideNum < 0) {
            G_SlideNum = G_MaxIndex;
        }

    }// end if button state == stop

    // now proceed normally:

    // decrement slide number and go around the end if needed.
    G_SlideNum -= 1;
    if (G_SlideNum < 0) {
        G_SlideNum = G_MaxIndex;
    }

    ShowCurrentSlide();

}// end previousHit



/* ******************************************************
 * nextHit()
 * Next button was hit. 
 * ******************************************************* */
function nextHit() {

    // if in slideshow running mode, then the slide counter has already been incremented.
    // first stop the show via the button handler so button text and data will be reset.
    // then decrement once to get to correct start slide number then proceed as normal.

    var buttonState = BtnResStop.getAttribute("data-State");
    if (buttonState === "Stop") {
        // currently running.  call stop handler
        ResStopHit();

        // decrement counter by 1:
        G_SlideNum -= 1;
        if (G_SlideNum < 0) {
            G_SlideNum = G_MaxIndex;
        }

    }// end if button state == stop

    // now proceed normally:

    // increment slide number and go around the end if needed.
    G_SlideNum += 1;
    if (G_SlideNum > G_MaxIndex) {
        G_SlideNum = 0;
    }

    ShowCurrentSlide();

}// end nextHit


/* ******************************************************
 * ResStopHit()
 * Resume / Stop button was hit. 
 * ******************************************************* */
function ResStopHit() {
    // check data state of button.  switch based on that.  
    // will either stop or start timer.  

    console.log("in resStop. Current slide: " + G_SlideNum);

    var buttonState = BtnResStop.getAttribute("data-State");

    switch (buttonState) {

        case "Stop":
            // stop the show and change button text to resume.
            // also stop the animation by clearing the class for the image and caption.
            // then make sure their opacity is 1.
            ClearTimer();
            BtnResStop.setAttribute("data-State", "Resume");
            BtnResStop.innerHTML = "Resume Show";
            G_MainSlide.setAttribute("class", "");
            G_MainSlide.style.opacity = 1;
            G_MainCaption.setAttribute("class", "");
            G_MainCaption.style.opacity = 1;

            // since we stopped, reset slide number to current one being shown.
            // so next and previous button handlers work.
            G_SlideNum -= 1;
            if (G_SlideNum < 0) {
                G_SlideNum = G_MaxIndex;
            }
            break;

        case "Resume":
            // restart show and change button text to stop.
            // increment slide number and go around the end if needed.
            // reset animation to work by resetting the class and opacity.

            // since we are resuming, reset slide number to next slide
            // so ShowCurrentSlide will show correct one on startup.
            G_SlideNum += 1;
            if (G_SlideNum > G_MaxIndex) {
                G_SlideNum = 0;
            }

            G_MainSlide.setAttribute("class", "myfading");
            G_MainSlide.style.opacity = "";
            G_MainCaption.setAttribute("class", "myfading");
            G_MainCaption.style.opacity = "";

            G_IntervalTimer = setInterval(ShowCurrentSlide, G_WaitTime);
            BtnResStop.setAttribute("data-State", "Stop");
            BtnResStop.innerHTML = "Stop Show";
            break;

    }// end switch


}// end ResStopHit

