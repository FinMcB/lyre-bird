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
			files:[],
			file:''
		};
		this.loadFiles = this.loadFiles.bind(this);

	}

	componentDidMount() {
	this.loadFiles();
}
loadFiles() {
	fetch('/api/files')
		.then(res => res.json())
		.then(files => {
			if (files.message) {
				console.log('No Files');
				this.setState({ files: [] })
			} else {
				this.setState({ files })
			}
		});
	}

	fileChanged(event) {
   const f = event.target.files[0];
   this.setState({
     file: f
   });
 }

 deleteFile(event) {
   event.preventDefault();
   const id = event.target.id;

   fetch('/api/files/'+id, {
     method: 'DELETE'
   }).then(res => res.json())
     .then(response => {
       console.log(response);
       if (response.success) this.loadFiles()
       else alert('Delete Failed');
     })
 }
 uploadFile(event) {
    event.preventDefault();
    let data = new FormData();
    data.append('file', this.state.file);
   fetch('/api/files', {
     method: 'POST',
     body: data
   }).then(res => res.json())
     .then(data => {
       if (data.success) {
       this.loadFiles();
     } else {
       alert('Upload failed');
     }
   });
 }





	render () {
		const { files } = this.state;

		return (
			<div className="col s1 center-align" style={{}}>


			<div className="row">
			<P5Wrapper sketch={sketch} />
			</div>
			<a id="micInitBtn" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
			<a id="recBtn" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">mic</i></a>
				<input type="file" onChange={this.fileChanged.bind(this)}/>
	          <button onClick={this.uploadFile.bind(this)}>Upload</button>
	          <table className="App-table">
	            <thead>
	              <tr>
	                  <th>File</th>
	                  <th>Uploaded</th>
	                  <th>Size</th>
	                  <th></th>
	              </tr>
	            </thead>
	            <tbody>
	              {files.map((file, index) => {
	                var d = new Date(file.uploadDate);
	                return (
	                  <tr key={index}>
	                    <td><a href={`http://localhost:8000/api/files/${file.filename}`}>{file.filename}</a></td>
	                    <td>{`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}</td>
	                    <td>{(Math.round(file.length/100) / 10)+'KB'}</td>
	                    <td><button onClick={this.deleteFile.bind(this)} id={file._id}>Remove</button></td>
	                  </tr>
	                )
	              })}
	            </tbody>
	          </table>
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
