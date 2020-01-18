import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


class LyricEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  render() {
    return (
      <ReactQuill value={this.state.text}
                  onChange={this.handleChange} />

    )
  }
}
const element = <h1>Hello, world</h1> ;
ReactDOM.render(element, document.getElementById('root'));

export default props => {
  return (
    <div className="col s1 center-align" style={{paddingtop: "10rem", margin: "5rem"}}>
    <div className="row">
    <LyricEditor />
    </div>
    </div>
  )
};
