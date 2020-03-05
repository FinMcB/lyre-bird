import React from 'react';
import ReactDOM from 'react-dom';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import 'p5/lib/addons/p5.sound';
import multer from 'multer'

class Player extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			rotation: 0,
			stateSketch: sketch,

		};

	}







	render () {
		const { files } = this.state;

		return (
			<div className="col s1 center-align" style={{}}>


				<div className="row">
					<P5Wrapper sketch={sketch} />
				</div>
				<div className="row">
					<a id="micInitBtn" class="btn-floating btn-large waves-effect waves-light #FFF8e3"><i class="material-icons">add</i></a>
					<a id="recBtn" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">mic</i></a>

		    </div>

			</div>

		// </div>
		// 		<input type="range" value={this.state.rotation}  min="0"  max="360" step="1" onInput={this.rotationChange.bind(this)}/>
		// 		<button onClick={this.pressEvent.bind(this)}>Change Sketch</button>
		// 	</div>
		);
	}
}

ReactDOM.render(<Player />, document.getElementById('root'));

export default Player;
