import * as p5 from 'p5';
import 'p5/lib/addons/p5.sound';

export default function sketch (p) {

  let mic, recorder, soundFile, soundBlob, recording, system;


let state = 0; // mousePress will increment from Record, to Stop, to Play

  p.setup = function(){
    p.createCanvas(400, 400);
    system = new ParticleSystem(p.createVector(p.width / 2, 50));

    p.background(200);
    p.fill(0);
    p.text('Enable mic and click the mouse to begin recording', 20, 20);
    let audio = p.createButton('play');
    audio.mousePressed(fun);

    let test = p.createButton('test');
    test.mousePressed(micInit);

    // create an audio in
    mic = new p5.AudioIn();

    // users must manually enable their browser microphone for recording to work properly!
    function micInit()  {
      mic.start();
    }
    // create a sound recorder
    recorder = new p5.SoundRecorder();

    // connect the mic to the recorder
    recorder.setInput(mic);

    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile();
  }

  p.draw = function(){
  // console.log(state);
  // console.log("mic active ? : " + mic.enabled)
  // console.log("mic source ? : " + mic.currentSource)
  //  console.log("mic input ? : " + mic.input)
   let vol = mic.getLevel();
    p.fill(127);
    p.stroke(0);

    // Draw an ellipse with height based on volume
    let h = p.map(vol, 0, 1, p.height, 0);
    p.ellipse(p.width / 2, h - 25, 50, 50);

    system.addParticle();
    system.run();
  }

  let Particle = function(position){
    this.acceleration = p.createVector(0, 0.05);
    this.velocity = p.createVector(p.random(-1,1), p.random(-1,0));
    this.position = position.copy();
    this.lifespan = 255;
  };

  Particle.prototype.run = function() {
    this.update();
    this.display();
  };

  Particle.prototype.update = function() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2;
  };

  // Method to display
  Particle.prototype.display = function() {
    p.stroke(200, this.lifespan);
    p.strokeWeight(2);
    p.fill(127, this.lifespan);
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
      let p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  };

  function fun() {
    // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
    if (state === 0 && mic.enabled) {
      // Tell recorder to record to a p5.SoundFile which we will use for playback
      recorder.record(soundFile);

      p.background(255, 0, 0);
      p.text('Recording now! Click to stop.', 20, 20);
      state++;
    } else if (state === 1) {
      recorder.stop(); // stop recorder, and send the result to soundFile

      p.background(0, 255, 0);
      p.text('Recording stopped. Click to play & save', 20, 20);
      state++;
    } else if (state === 2) {
      soundFile.play(); // play the result!
      soundBlob = soundFile.getBlob();
      console.log(soundBlob);
      let serverUrl = 'https://jsonplaceholder.typicode.com/posts';
      let httpRequestOptions = {
        method: 'POST',
        body: new FormData().append('soundBlob', soundBlob),
        headers: new Headers({
          'Content-Type': 'multipart/form-data'
        })
      }
      p.httpDo(serverUrl, httpRequestOptions);
      let blobUrl = URL.createObjectURL(soundBlob);
      let htmlAudioElt = p.createAudio(blobUrl).showControls();

      p.saveSound(soundFile, 'mySound.wav'); // save file
      state++;
    }
  }
}


  // var mic, recorder, soundFile, peaks, duration;
  // var state = 'INIT';
  // var currentLoopRange, loopRanges = [];
  // let loopStartX, loopEndX;
  //
  // //cool effects if you don't stop previous loop here
  // var stopPreviousLoop = false;
  //
  // p.setup = function ()  {
  //   let myDiv = p.createDiv('click to start audio');
  //   myDiv.position(p.width/2, 100);
  //   p.createCanvas(p.windowWidth, p.windowHeight);
  //
  //
  //   p.userStartAudio().then(function() {
  //   myDiv.remove();
  //   });
  //   loopStartX = 0;
  //   loopEndX = 0;
  //   mic = new p5.AudioIn();
  //   mic.start();
  //   recorder = new p5.SoundRecorder();
  //   recorder.setInput(mic);
  //   p.pixelDensity(1);
  //   // frameRate(10);
  // }
  //
  // p.draw = function ()  {
  //   p.background(255);
  //   if(state === 'WAVEFORM'){
  //     var pos = (soundFile.currentTime()/duration)*p.width;
  //     drawWave();
  //
  //     //button boxes
  //     p.fill(100,50);
  //     p.rect(0,0,200,100);
  //     p.rect(p.width-200,0,200,100);
  //
  //     //record button
  //     p.fill(255,0,0);
  //     p.ellipse(100, 50, 50, 50);
  //
  //     if(soundFile.isPlaying()){
  //       //stop
  //       p.rect(p.width-125, 25, 50, 50);
  //     } else {
  //       //play
  //       p.triangle(p.width-125, 25,
  //                p.width-100, 50,
  //               p.width-125, 75);
  //     }
  //
  //     //draw all the loop ranges
  //     p.fill(100,50);
  //     p.noStroke();
  //     loopRanges.map(r=>{
  //       p.rect(r.start,100,r.end-r.start,p.height);
  //     });
  //
  //     //draw the play head
  //     p.stroke(100);
  //     p.line(pos,100,pos,p.height);
  //
  //   } else if(state === 'INIT'){
  //     p.noStroke();
  //     p.fill(255,0,0);
  //     drawRecord();
  //     p.fill(255);
  //
  //   } else if(state === 'RECORDING'){
  //     if(p.frameCount % 50 === 0){
  //       p.fill(100);
  //     } else if(p.frameCount % 25 === 0){
  //       p.fill(255,0,0);
  //     }
  //     drawRecord();
  //   }
  // }
  //
  // function drawWave(){
  //   if(!peaks){return;}
  //   p.noStroke();
  //   p.fill(100);
  //   p.beginShape();
  //   p.vertex(0,p.height/2);
  //   for(var i=0;i<peaks.length;i++){
  //     p.vertex(i/peaks.length*p.width, p.height/2+peaks[i]*(p.height/2));
  //   }
  //   p.vertex(p.width,p.height/2);
  //   p.endShape();
  // }
  //
  // function isStopButton(){
  //   return p.mouseY < 100 && p.mouseX > p.width-200;
  // }
  //
  // function isRecordButton(){
  //   return p.mouseY < 100 && p.mouseX < 200;
  // }
  //
  // function mousePressed(){
  //   if(state === 'WAVEFORM' && !isStopButton() && !isRecordButton()){
  //     currentLoopRange = {start:p.mouseX,end:p.mouseX};
  //     loopRanges.push(currentLoopRange)
  //   }
  //   return false;
  // }
  //
  // function mouseDragged(){
  //   if(currentLoopRange.end >= currentLoopRange.start){
  //     currentLoopRange.end = p.mouseX;
  //   }
  //   return false;
  // }
  //
  // function mouseReleased(){
  //   console.log('mouseReleased state='+state);
  //   if(state === 'WAVEFORM'){
  //     console.log('isStopButton()='+isStopButton());
  //     if(isStopButton()){
  //       if(soundFile.isPlaying()){
  //         soundFile.stop();
  //         loopRanges = [];
  //       } else {
  //         soundFile.play();
  //       }
  //     } else if(isRecordButton()){
  //       loopRanges = [];
  //       state = 'INIT';
  //       nextState();
  //
  //     } else if(soundFile){
  //       //done dragging loop points
  //
  //       if(stopPreviousLoop){ soundFile.stop(); }
  //
  //       //loop([startTime],[rate],[amp],[cueLoopStart],[duration])
  //       var start = currentLoopRange.start;
  //       var end = currentLoopRange.end;
  //       soundFile.loop(0,1,0.5,
  //                (start/p.width)*duration,
  //                ((end-start)/p.width)*duration);
  //     }
  //   } else {
  //     nextState();
  //   }
  //   return false;
  // }
  //
  // function drawRecord(){
  //   p.ellipse(p.width*0.5,p.height*0.5,200,200);
  // }
  //
  // function nextState() {
  //   if (state === 'INIT' && mic.enabled) {
  //     //start recording
  //     if(soundFile){soundFile.stop();}
  //     soundFile = new p5.SoundFile();
  //     recorder.record(soundFile);
  //     state = 'RECORDING';
  //
  //   } else if (state === 'RECORDING') {
  //     //end recording
  //     recorder.stop();
  //     peaks = soundFile.getPeaks(1000);
  //     duration = soundFile.duration();
  //
  //     //loop([startTime],[rate],[amp],[cueLoopStart],[duration])
  //     if(stopPreviousLoop)soundFile.loop(0,1,0.5,0,duration);
  //     // soundFile.loop(0,random(0,2),0.5,0,soundFile.duration());
  //     // soundFile.play();
  //     // save(soundFile, 'mySound.wav');
  //     state = 'WAVEFORM';
  //   }
  // }
