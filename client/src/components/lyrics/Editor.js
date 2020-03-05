import React from "react";
import ReactDOM from 'react-dom';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
// import Chord;


let contents;

class LyricEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      error: '',
    };
this.handleChange = this.handleChange.bind(this);
}

modules = {
   toolbar: [
     [{ 'header': [1, 2, false] }],
     ['bold', 'italic', 'underline','strike'],
     ['clean']
   ],
 }

handleChange (content, delta, source, editor) {
 this.onSubmit();
 contents = editor.getContents();
 console.log(contents);
 console.log(delta);

}



onSubmit(e) {
  let i = this.state.getContents;
 var background = this.state.editor;
 console.log('background', background); //<p>testing</p>
 //... rest of code]
  }

  render() {

    return (

      <ReactQuill
          name="editor"
          modules={this.modules}
          onChange={this.handleChange}
          value={this.state.editor || ''} >

      </ReactQuill>


    )

  }
}

const element = <h1>Hello, world</h1> ;
ReactDOM.render(element, document.getElementById('root'));



export default props => {
  return (
    <div className="col s1 center-align" style={{paddingtop: "10rem", margin: "0rem"}}>
    <div className="row">
      <LyricEditor />
    </div>

    </div>
  )
};
