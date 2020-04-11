import React from 'react';
import ReactDOM from 'react-dom';
import sketch from './sketch';
import sketch2 from './sketch2';
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

	rotationChange(e){
		this.setState({rotation:e.target.value});
	}

	pressEvent(){
		this.state.stateSketch === sketch ? this.setState({stateSketch:sketch2}) : this.setState({stateSketch:sketch});
	}

	render () {
		console.log(note,freqDisplay);
		return (
			<React.Fragment>

			<div className="col s1 center-align" style={{borderRadius:'30px'}}>
			<div style={{

			    display: 'inline-block',
			    width: '100%',
					marginTop: '10vh',
			}} >
				<P5Wrapper style={{}}
					sketch={sketch}  />

			</div>
		  </div>
			<Row style={{}}>
						 {/*//////////////NEW SONG//////////*/}
				<Col
					s={12}
					l={4}           >
				</Col>
			</Row>
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
