import * as p5 from 'p5';
import 'p5/lib/addons/p5.sound';

export default function sketch (p) {

  let mic, recorder, soundFile, soundBlob, recording, system, vol;
  let slider;
  let timer = 1;
  let recColour = p.color('rgba(159, 70, 143,0.5)');
  let micInitBtn = p.select('#micInitBtn');
  let recBtn = p.select('#recBtn').hide();
  let media;
  var recBlob;
  let one = 1;




let state = 0; // mousePress will increment from Record, to Stop, to Play

  p.setup = function(){

    let cnv = p.createCanvas(375, 80);


    var audioContext = new AudioContext();
    media = p5.MediaElement;
    system = new ParticleSystem(p.createVector(p.width/2, p.height/2));

    p.fill(0);
    p.text('Enable mic and click the mouse to begin recording', 20, 20);

    micInitBtn.mousePressed(micInit);
    recBtn.mousePressed(record);

    // create an audio in
    mic = new p5.AudioIn();

    // users must manually enable their browser microphone for recording to work properly!
    function micInit()  {
      mic.start();
      recBtn.show();
    }
    // create a sound recorder
    recorder = new p5.SoundRecorder();

    // connect the mic to the recorder
    recorder.setInput(mic);

    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile();



  }

  function windowResized() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

  p.draw = function(){
    p.background(54,54,54);
    if(mic){
      vol = mic.getLevel();
      // console.log(vol);

    };

    system.addParticle();
    system.run();

    p.stroke(recColour);
    p.strokeWeight(9);
    p.fill('rgba(2,128,144,1)');
    p.ellipse(p.width/2, p.height/2, 80);

  }

  // A simple Particle class
  let Particle = function(position) {
    this.acceleration = p.createVector(0, 0);
    this.velocity = p.createVector(p.random(-4, 4), p.random(-4, 4));
    this.position = position.copy();
    this.lifespan = 50;
  };

  Particle.prototype.run = function() {
    this.update();
    this.display();
  };

  // Method to update position
  Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 0.8;
  };

  // Method to display
  Particle.prototype.display = function() {
    p.stroke(200, this.lifespan);
    p.strokeWeight(3);
    let rnd = p.random(10,255);
    let r = p.map(vol, 0, 0.08, 0, rnd);
    let g = p.map(vol, 0, 0.05 , 0,rnd);
    let b = p.map(vol, 0, 0.05 , 0,rnd);

    p.fill(rnd, rnd, b,this.lifespan);
    p.ellipse(this.position.x, this.position.y, 12, 12);
  };

  // Is the particle still useful?
  Particle.prototype.isDead = function(){
    return this.lifespan < 0;
  };

  let ParticleSystem = function(position) {
    this.origin = position.copy();
    this.particles = [];
  };

  ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
  };





  ParticleSystem.prototype.run = function() {
    for (let i = this.particles.length-1; i >= 0; i--) {
      let partArr = this.particles[i];
      partArr.run();
      if (partArr.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  };

  function record() {
    // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
    if (state === 0 && mic.enabled) {
      // Tell recorder to record to a p5.SoundFile which we will use for playback
      recorder.record(soundFile);

      p.background(255, 0, 0);
      p.text('Recording now! Click to stop.', 20, 20);
      recColour = p.color('rgba(255, 54, 54,0.8)');
      state++;
    } else if (state === 1) {
      recorder.stop(); // stop recorder, and send the result to soundFile
      recColour = p.color('rgba(159, 70, 143,0.8)');
      p.background(0, 255, 0);
      p.text('Recording stopped. Click to play & save', 20, 20);
      soundBlob = soundFile.getBlob();
      let blobUrl = URL.createObjectURL(soundBlob);
      let htmlAudioElt = p.createAudio(blobUrl).showControls();
      if (htmlAudioElt){
        state++;
      }
      state++;
    } else if (state === 2) {


      console.log(soundBlob);

      let formdata = new FormData() ; //create a formdata to upload
      formdata.append('soundBlob', soundBlob,  'rec.wav') ; // append the sound blob and the name of the file. third argument will show up on the server as req.file.originalname
      // Now we can send the blob to a server...
       var serverUrl = '../server.js'; //  (need to make a POST endpoint on server)

       // //build a HTTP POST request
       var httpRequestOptions = {
         method: 'POST',
         body: formdata ,
         headers: new Headers({
           'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
         })
       };
       console.log(httpRequestOptions);
       // use p5 to make the POST request at our URL and with our options
       p.httpDo(
         serverUrl,
         httpRequestOptions,
         (successStatusCode)=>{ //if we were successful...
           console.log("uploaded recording successfully: " + successStatusCode)
         },
         (error)=>{console.error(error);}
       )

    }
  }
}
