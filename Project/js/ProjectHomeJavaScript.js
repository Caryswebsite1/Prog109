// JavaScript source code



const HOME_AUDIO = document.querySelector("#HomeAudioButton");
let myAudio = document.querySelector("#MainAudio");
let bAudioOn = false;
let bAudioFirstRun = true;
let bButtonFocus = false;

// animation accompanyment
var myTL1 = new TimelineMax();

console.log("button is: " + HOME_AUDIO);

/////////////////////////////////////////////////////////////////////////////////////////
// preload images method.  Requires the creation of new "images"
// and assigning the image objects the source of the image you want to preload.
// Unfortunately, it appears you can't use these image object.src in code below to 
// assign to an existing page element.  Have to use the url with the same path.
let Enterprise = [];
Enterprise[0] = new Image();
Enterprise[0].src = "Images/USSEnterpriseFixed.png";
Enterprise[1] = new Image();
Enterprise[1].src = "Images/EnterpriseLeaving.png";
//////////////////////////////////////////////////////////////////////////////////////////

console.log("eE1: " + Enterprise[0].src + "  E2: " + Enterprise[1].src );

// add event listeners
HOME_AUDIO.addEventListener("click", ToggleHomeAudio, false);
HOME_AUDIO.addEventListener("focus", ToggleButtonBorder, false);
HOME_AUDIO.addEventListener("blur", ToggleButtonBorder, false);
myAudio.addEventListener("ended", ResetAudio, false);

//FIRE_BTN.addEventListener("click", fireTorpedoHandler, false)
//window.addEventListener("keydown", keydownHandler, false);



function ToggleHomeAudio() {

    console.log("in Toggle");

    if (!bAudioOn) {
        // turning audio on.
        if (bAudioFirstRun) {
            myAudio.currentTime = 0;   // sets it to start at beginning of sound track.
            myAudio.volume = 0.5;
            myAudio.play();

            // Enter the USS Enterprise!
            // reset start locations for ship and warpstar incase this is not the first time through.
            myTL1.to('#Enterprise', 10, { scale: 0.001, backgroundImage: "url('Images/USSEnterpriseFixed.png')", top: 100, left:0, ease: Power0.easeNone })
                .to('#WarpStar', 0.01, { scale: 0.01, top: 240, left: 275, ease: Power0.easeNone })
                .to('#WarpStar', 0.5, { opacity: 1, scale: 0.5, rotation: 360, ease: Power0.easeNone })
                .to('#Enterprise', 0.01, { opacity: 1, scale: 0.001, ease: Power0.easeNone })
                .to('#WarpStar', 0.5, { opacity: 0, scale: 0.01, rotation: -360, ease: Power0.easeNone })
                .to('#Enterprise', 12.0, { scale: 1, top: 200, left: 50, ease: Power0.easeNone }, '-=0.3') 
                //.to('#Enterprise', 0.01, { backgroundImage: Enterprise[1].src, ease: Power0.easeNone })
                .to('#Enterprise', 0.01, { backgroundImage: "url('Images/EnterpriseLeaving.png')", ease: Power0.easeNone })
                .to('#Enterprise', 12.0, { scale: 0.01, top: 300, left: 650, ease: Power0.easeNone }) 
                .to('#Enterprise', 0.01, { opacity: 0, ease: Power0.easeNone })
                .to('#WarpStar', 0.01, { top: 440, left: 925, ease: Power0.easeNone })
                .to('#WarpStar', 0.01, { opacity: 1, scale: 0.01, ease: Power0.easeNone })
                .to('#WarpStar', 0.5, { scale: 0.5, rotation: 360, ease: Power0.easeNone })
                .to('#WarpStar', 0.5, { opacity: 0, rotation: -360, scale: 0.01, ease: Power0.easeNone });

            bAudioFirstRun = false;
        }
        else {
            // not first run. don't redisplay animation.
            if (myAudio.ended) {
                myAudio.currentTime = 0;   // sets it to start at beginning of sound track.
                myAudio.volume = 0.5;
            }
            myAudio.play();
        }
        console.log("src = " + myAudio.src);
        bAudioOn = true;
        HOME_AUDIO.textContent = "Audio Off";

    }
    else {
        // turning audio off.
        myAudio.pause();    // pauses Audio
        bAudioOn = false;
        HOME_AUDIO.textContent = "Audio On";
    }


}// end ToggleHomeAudio


function ToggleButtonBorder() {
// make border green if we have focus
    if (!bButtonFocus) {
        // did not have focus but will now.
        // set button border to green. 
        console.log("in toggle to aqua");
        HOME_AUDIO.style.borderColor = 'aqua';
        bButtonFocus = true;
    }
    else {
        console.log("in toggle to normal");
        HOME_AUDIO.style.borderColor = '';
        bButtonFocus = false;
    }

}// end toggle button border


function ResetAudio() {
// audio has ended.  reset button state and bAudioFirstRun
// so we can do it all, including animation, again..
    myAudio.currentTime = 0;   // sets it to start at beginning of sound track.
    myAudio.volume = 0.5;
    bAudioFirstRun = true;
    bAudioOn = false;
    HOME_AUDIO.textContent = "Audio On";
}


/* I can't get on the fly to have both mp3 and ogg .  So defaulting to audio tags on the html page version
// set up audio
let myAudio = document.createElement("audio");
myAudio.src = photon;
*/

//let myAudio = document.querySelector("#TorpSound");
//myAudio.currentTime = 0;   // sets it to start at beginning of sound track.
//console.log("src = " + myAudio.src);
//myAudio.volume = 0.5;
//myAudio.play();


//var myTL1 = new TimelineMax({ onRepeat: AudioReset, repeat: -1 });

//myTL1.to('#Enterprise', 5.0, { opacity: 1, width: 300, height 250, top: 400, left: 200, ease: Power0.easeNone })
//    .to('#Enterprise', 0.1, { src: "images/USS_Enterprise_Leaving.jpg", top: 400, left: 200, ease: Power0.easeNone })
//    .to('#Enterprise', 5.0, { opacity: 0, width: 4, height 4, top: 200, left: 400, ease: Power0.easeNone })
//    ; // end timeline

