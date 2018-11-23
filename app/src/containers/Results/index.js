import React, {Component} from 'react';
import './index.css';

class Results extends Component {

  constructor (props) {
    super(props);
    this.state = {
      textareaVal: ''
    }
  }


  handler = (event) => {
    console.log("dfdfd",window.getSelection().toString())
    this.setState({textareaVal: window.getSelection().toString()})
  }

  render () {
    console.log("text ", this.state.textareaVal)
    return (
      <div className="main-results">
        <div onMouseUp={(e) => this.handler(e)}>
          <p>Hello</p>World
        </div>
      </div>)
  }
}

export default Results;