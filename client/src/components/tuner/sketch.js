
import * as p5 from 'p5/lib/addons/p5.sound.min.js';

export default function sketch (p) {
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

let notes = UKULELE_NOTES;


  p.setup = function () {
    p.createCanvas(400, 400, p.WEBGL);

    // mic = new p5.AudioIn(function(err){console.error("Err", err);});
    // mic.start(micInitialized);
    selection = p.createSelect();
    selection.option('Ukulele');
    selection.option('Guitar');
    selection.changed(function(){
      let value = selection.value();
      if (value == 'Guitar') {
        notes = GUITAR_NOTES;
      }else if (value == 'Ukulele') {
        notes = UKULELE_NOTES;
      }
    });
  }

  function micInitialized() {
  console.log("Mic Initialized");
  pitch = p.ml5.pitchDetection(model, p.getAudioContext(), mic.stream, modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded")
  // initialized = true;
  pitch.getPitch(function(err, f){initialized = true});
}


  p.draw = function () {
    p.background(155);
    if(!initialized) {
      p.textSize(32);
      p.textAlign(p.CENTER)
      p.text("Sketch loading..", p.width / 2, p.height / 2);
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
      let d = p.map(targetFreq + diff, 0, 440, 0, p.width);
      p.circle(p.width / 2, p.height / 2, d);

      p.fill(0,0,0);
      p.textSize(32);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(note, p.width / 2, p.height / 2);
      displayFreq(f);
    });

    p.fill(0, 0, 0, 0);
    p.strokeWeight(1);
    let last = Object.keys(notes)[Object.keys(notes).length-1];
    for(var key in notes) {
      let d = p.map(notes[key], 0, notes[last], 0, p.width);

      p.circle(p.width / 2, p.height / 2, d);
    }
  }

  function displayFreq(f) {
    p.fill(0,0,0,255);
    p.textSize(25)
    p.textAlign(p.CENTER)
    p.text(f.toFixed(2), p.width / 2, 25);
  }

  function display(txt) {
    p.fill(0,0,0,255);
    p.textSize(25)
    p.textAlign(p.CENTER)
    p.text(txt, p.width / 2, p.height - 15);
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
