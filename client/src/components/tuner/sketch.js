
import * as p5 from 'p5';
import * as ml5 from 'ml5';
import 'p5/lib/addons/p5.sound';
import './style.css'
import fontTest from "./quicksand.otf"
let note;
let freqDisplay;
let value;



export default function sketch (p) {
  let font;
    p.preload = function () {
    // font = p.loadFont('quicksand.otf');
    // console.log(font);
  }

  const model = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
  const THRESHOLD = 2;

  let pitch;
  let mic;
  let initialized = false;
  let selection;
  let scale;
  let d;
  let targetFreq;
  let diff;
  let last;





  const GUITAR_NOTES = {
  'E2': 82.41,
  'A2': 110.00,
  'D3': 146.83,
  'G3': 196.00,
  'B3': 246.94,
  'E4': 329.63,
};



let notes = GUITAR_NOTES;
let freqHTML = p.select('#freqHTML');





  p.setup = function () {
    // p.createCanvas(300,300, p.WEBGL);
    let onBtn = p.createButton('ON');
    onBtn.position(p.width/2, 200);
    onBtn.mousePressed(turnOn);


      var cnv = p.createCanvas(375, 400);
      cnv.style('display', 'inline');



        value = 'Guitar';
          notes = GUITAR_NOTES;







  }

  function turnOn(){
    mic = new p5.AudioIn(function(err){console.error("Err", err);});
    mic.start(micInitialized);
  }

  function micInitialized() {
  console.log("Mic Initialized");
  pitch = ml5.pitchDetection(model, p.getAudioContext(), mic.stream, modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded")
  initialized = true;
  pitch.getPitch(function(err, f){initialized = true});
}


  p.draw = function () {

    p.background(2,195,154);
    if(!initialized) {
      p.textSize(20);
      p.fill(54,54,54)
      p.text("Turn On Tuner", p.width/2, p.height/2);
      return;
    }
    pitch.getPitch(function(err, f){ //retrieves pitch with error first callback
      note = getClosestNote(f);
      targetFreq = notes[note];
      diff = f - targetFreq;
      if (p.abs(diff) < THRESHOLD){  //displays whether a note is correct with 2hz threshold
        diff = 0;
        display("Perfect!");
      }
      p.strokeWeight(0);


      d = p.map(targetFreq + diff, 82.41, 329.63, p.width/4, p.width-p.width/4); //visual scale of guitar strings




      p.textSize(32);
      p.text(note, p.width/2, p.height/2);
      displayFreq(f);
      freqScale();
      freqHTML.elt.innerHTML = ("Detected Frequency: ", f);
    });


    // p.fill(0, 0, 0, 0);
    p.strokeWeight(1);
    last = Object.keys(notes)[Object.keys(notes).length-1];
    for(var key in notes) {
      // let dop = p.map(notes[key], 0, notes[last], 0, p.width-100);
      // p.circle(0, 0, dop);
    }

  }



  function displayFreq(f) {
    p.fill(0,0,0,255);
    p.textSize(25)
    if(f){
      freqDisplay= f.toFixed(2);
      p.text(freqDisplay,p.width/2, p.height/2+500);
    }

  }

  function freqScale(){
    p.fill(54,54,54)
    p.strokeWeight(8);
    p.line(p.width/4,p.height/1.2,p.width-p.width/4,p.height/1.2);
    p.strokeWeight(5);
    p.line(d,p.height/1.2,d,p.height/1.4)

  }

  function display(txt) {
    p.fill(0,0,0,255);
    p.textSize(25)
    p.text(txt, p.width/2, p.height/2);
  }

  function getClosestNote(f) {
    let min = Infinity;
    let note;
    for(var key in notes) {
      let diff = p.abs(f - notes[key]);
      if (diff < min ) {
        min = diff;
        note = key;
      }
    }
    return note;
  }

};
export {note, freqDisplay}
