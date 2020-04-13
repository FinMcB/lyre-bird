import React from 'react';
import ReactDOM from 'react-dom';
import sketch from './sketch';
import './style.css'
import 'p5/lib/addons/p5.sound';
import P5Wrapper from 'react-p5-wrapper';
import { Button, Card, Row, Col } from 'react-materialize';

import {note} from './sketch';
import {freqDisplay} from './sketch';






class Tuner extends React.Component{

	constructor(props) {
		super(props);
		this.note = note;
		this.state = {
			rotation: 0,
			stateSketch: sketch,
		};
	}






	render () {
		return (
			<React.Fragment>


				<div style={{paddingTop: "0vh", alignContent: 'center', textAlign: 'center', background: 'rgb(2,195,154)'}}>
				<P5Wrapper sketch={sketch}   />
				</div>


				<h3>Detected Frequency:</h3>
				<h4 id='freqHTML'></h4>
			</React.Fragment>
		// </div>
		// 		<input type="range" value={this.state.rotation}  min="0"  max="360" step="1" onInput={this.rotationChange.bind(this)}/>
		// 		<button onClick={this.pressEvent.bind(this)}>Change Sketch</button>
		// 	</div>
		// <P5Wrapper sketch={sketch} />

		);

	}
}

ReactDOM.render(<Tuner />, document.getElementById('root'));

export default Tuner;
