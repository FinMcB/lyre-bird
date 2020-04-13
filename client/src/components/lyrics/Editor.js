import React from "react";
import ReactDOM from 'react-dom';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import { Button, Card, Row, Col } from 'react-materialize';
import Collapsible from 'react-collapsible';


// import Chord;


let lyricContent;

export default  class LyricEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      error: '',
      sampleText: 'This is where your lyrics go',
    };
this.handleChange = this.handleChange.bind(this);
}

modules = {
   toolbar: [
     [{ 'header': [1, 2, false] }],
     ['bold']
   ],
 }



handleChange (content, delta, source, editor) {
 this.onSubmit();
 lyricContent = editor.getContents();
 // console.log(contents);
 // console.log(delta);
 console.log(lyricContent.ops); //<p>testing</p>
 console.log('DELTA INSERT: ', lyricContent.ops[0].insert)

}



onSubmit(e) {
  let i = this.state.getContents;
 var background = this.state.editor;
 //... rest of code]
  }

  render() {

    return (
      <div className="row">

      <ReactQuill
          style={{width:'100%', padding:'0px', margin:'auto', color: '#383838'}}
          name="editor"
          modules={this.modules}
          onChange={this.handleChange}
          value={this.state.editor || ''}
          placeholder={this.state.sampleText}

          >
      </ReactQuill>
    </div>
    )

  }
}


const element = <h1>Hello, world</h1> ;
ReactDOM.render(element, document.getElementById('root'));
