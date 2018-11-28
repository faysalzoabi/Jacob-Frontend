import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShowFile from "../../components/ShowFile"
import './index.css';

class Results extends Component {

  constructor (props) {
    super(props);
    this.state = {
      textareaVal: ''
    }
  }


  getHTMLOfSelection = () => {
    let range;
    if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      return range.htmlText;
    }
    else if (window.getSelection) {
      let selection = window.getSelection();
      if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
        let clonedSelection = range.cloneContents();
        let div = document.createElement('div');
        div.appendChild(clonedSelection);
        return div.innerHTML;
      }
      else {
        return '';
      }
    }
    else {
      return '';
    }
  }

  breakIntoTags = (html) => {

  }

  highlightSelected = () => {
    let html = this.getHTMLOfSelection()
    console.log(html)
    // let htmlTags = []
  }


  handler = () => {
    // console.log("dfdfd",window.getSelection().toString())
    // this.setState({textareaVal: window.getSelection().toString()})
    this.highlightSelected()

  }

  render () {
    return (
      <div className="main-results">
        <div onMouseUp={this.handler}>
          {
            this.props.pdfs.map((pdf, index) => {
              return <ShowFile key={index} pdf={pdf} />
            })
          }
        </div>
      </div>)
  }
}


const mapStateToProps = state => {
  return {
    pdfs: state.pdfs,
  };
};

export default connect(mapStateToProps)(Results);