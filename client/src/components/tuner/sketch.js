
import * as p5 from 'p5';
import * as ml5 from 'ml5';
import 'p5/lib/addons/p5.sound';
import './style.css'



export default function sketch (p) {
  // let myFont;
  //   p.preload = function () {
  //   myFont = p.loadFont("client/public/assets/quicksand.otf");
  // }

  const model = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
  const THRESHOLD = 2;

  let pitch;
  let mic;
  let initialized = false;
  let selection;

  const GUITAR_NOTES = {
  'E2': 82.41,
  'A2': 110.00,
  'D3': 146.83,
  'G3': 196.00,
  'B3': 246.94,
  'E4': 329.63,
};

const UKULELE_NOTES = {
  'G4': 392.00,
  'C4': 261.63,
  'E4': 329.63,
  'A4': 440.00,
}

let notes = GUITAR_NOTES;




  p.setup = function () {
    console.log('./public/assets/Inconsolata.otf');
    // p.createCanvas(300,300, p.WEBGL);


    var cnv = p.createCanvas(p.windowWidth,p.windowHeight, p.WEBGL);
    cnv.style('display', 'inline');

    mic = new p5.AudioIn(function(err){console.error("Err", err);});
    mic.start(micInitialized);
    selection = p.createSelect();
    selection.option('Ukulele');
    selection.option('Guitar');
    selection.changed(function(){
      let value = selection.value();
      value = 'Guitar';
      if (value === 'Guitar') {
        notes = GUITAR_NOTES;
      }else if (value === 'Ukulele') {
        notes = UKULELE_NOTES;
      }
    });
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
      p.textSize(32);
      p.textAlign(p.CENTER)
      p.text("Sketch loading..", 0, 0);
      return;
    }
    pitch.getPitch(function(err, f){
      let note = getClosestNote(f);
      let targetFreq = notes[note];
      let diff = f - targetFreq;
      if (p.abs(diff) < THRESHOLD){
        diff = 0;
        display("Perfect!");
      }
      p.strokeWeight(0);
      let multiplier = p.abs(diff / (targetFreq * 0.2));
      p.fill(255 * multiplier, 255 * (1 - multiplier), 0);
      let d = p.map(targetFreq + diff, 0, 440, 0, p.width - 100);
      p.circle(0, 0, d);
      p.fill(0,0,0);
      p.textSize(32);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(note, 0, 0);
      displayFreq(f);
      windowResized();
    });



    p.fill(0, 0, 0, 0);
    p.strokeWeight(1);
    let last = Object.keys(notes)[Object.keys(notes).length-1];
    for(var key in notes) {
      let d = p.map(notes[key], 0, notes[last], 0, p.width-100);
      p.circle(0, 0, d);

    }
  }

  function windowResized() {
  p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  function displayFreq(f) {
    p.fill(0,0,0,255);
    p.textSize(25)
    p.textAlign(p.CENTER)
    if(f){
      p.text(f.toFixed(2), 0, 25);

    }

  }

  function display(txt) {
    p.fill(0,0,0,255);
    p.textSize(25)
    p.textAlign(p.CENTER);
    p.text(txt, 0, p.height - 15);
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

// export default function sketch (p){
//   p.setup = function() {
//   var mic;
//   mic = new p5.AudioIn()
//   mic.start();
// }
// p.draw = function() {
//   p.background(0)
//   micLevel = mic.getLevel();
//   p.ellipse(p.width/2, constrain(p.height-micLevel*5, 0, p.height)
// }
//
//
//
// };
