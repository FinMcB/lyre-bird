import React from 'react';
import ReactDOM from 'react-dom';
import sketch from './sketch';
import sketch2 from './sketch2';
import './style.css'
import 'p5/lib/addons/p5.sound';
import P5Wrapper from 'react-p5-wrapper';





class Tuner extends React.Component{

	constructor(props) {
		super(props);
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
		return (
			<div className="col s1 center-align" style={{}}>
			<div className="row">
				<P5Wrapper sketch={sketch} />

			</div>
		  </div>

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
