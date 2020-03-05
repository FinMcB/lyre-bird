import React from 'react';
import GuitarChord from 'react-guitar-chords';




class Chord extends React.Component{
  constructor(){
    super();
  }


  render(){
    return (
      <React.Fragment>
      <div className="row">
        <br></br>
        <GuitarChord
          chordName='C major'
          frets={['x', 3, 2, 0, 1, 0]}
        />
      </div>

    </React.Fragment>

    );

  }
}

export default Chord;
