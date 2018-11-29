import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Sidebar from '../Sidebar'
import "./index.css"
import Typography from '@material-ui/core/Typography';

class RenderDocument extends Component {

  state = {
    selected_text: "",
    pdf_documents: "",
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

  onSelectText = () => {
    let html = this.getHTMLOfSelection();
    this.setState({
      selected_text: html,
    })
  };


  render() {
    console.log("pdf props,", this.props.pdf.id)

    return (
      <div className="container">
        <Paper className="leftPanel">
          <div className="textDoc" onMouseUp={this.onSelectText}>
            <Typography variant="body1" gutterBottom>
              {this.props.pdf.text}
            </Typography>
          </div>
        </Paper>
        <div className="rightPanel">
          <Sidebar selected_text={this.state.selected_text} pdf_document={this.state.pdf_document} id={this.props.pdf.id} />
        </div>
      </div>
    );
  }
}


export default (RenderDocument);