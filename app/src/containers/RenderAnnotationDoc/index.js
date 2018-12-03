import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Sidebar from '../Sidebar'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import "./index.css"
import {fetchAllPdfs, setAnnotationPdf} from "../../store/actions/pdfActions";

class RenderAnnotationDoc extends Component {

    state = {
        selectedText: "",
    };

    componentDidMount = () => {
        this.props.dispatch(fetchAllPdfs())
          .then(() => {
              let pdf = this.props.pdfs.filter(pdf => pdf.id === Number(this.props.match.params.pdfId))[0]
              this.props.dispatch(setAnnotationPdf({...pdf}))
          })


    };

    componentWillUnmount = () => {
         this.props.dispatch(setAnnotationPdf({}))
    }

    componentDidUpdate = () => {
        let pdf = this.props.pdfs.filter(pdf => pdf.id === Number(this.props.match.params.pdfId))[0]
        document.getElementById('roots').innerHTML = this.props.pdf.text
    };

    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.getHTMLOfSelection()) {
            return true
        }
        let nextPdf = nextProps.pdfs.filter(pdf => pdf.id === Number(this.props.match.params.pdfId))[0];
        return nextPdf.text !== this.props.pdf.text;
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


    onSelectText = () => {
        let html = this.getHTMLOfSelection();
        this.setState({
            selectedText: html,
        })
    };


    resetSelection = () => {
        this.setState({
            selectedText: ""
        });
        window.getSelection().empty()
    };


    render () {
        return (
          <div className="container">
              <Paper className="leftPanel">
                  <div className="textDoc" onMouseUp={this.onSelectText}>
                      <div id="roots">
                      </div>
                  </div>
              </Paper>


              <div className="rightPanel">
                  <Sidebar selectedText={this.state.selectedText} pdf={this.props.pdf}
                           resetSelection={this.resetSelection}/>
              </div>

          </div>
        );

    }


}


const mapStateToProps = state => {
    return {
        tags: state.tags,
        pdf: state.pdfs.annotation_pdf,
        pdfs: state.pdfs.all_pdfs
    };
};

export default withRouter(connect(mapStateToProps)(RenderAnnotationDoc));
