import React, {Component} from 'react';
import {connect} from 'react-redux';

import RenderDocument from '../RenderDocument';
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
  };


  highlightSelected = () => {
    let html = this.getHTMLOfSelection()
    console.log(html)
    // let htmlTags = []
  };


  handler = () => {
    this.highlightSelected()

  };

  render () {
    return (

        <div onMouseUp={this.handler}>
          {
            this.props.datapoint_pdfs.map((pdf, index) => {
              return <RenderDocument key={index} pdf={pdf}/>
            })
          }
        </div>

    )
  }
}


const mapStateToProps = state => {
  return {
    datapoint_pdfs: state.pdfs.datapoint_pdfs,
  };
};

export default connect(mapStateToProps)(Results);