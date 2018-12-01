import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Sidebar from '../Sidebar'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import "./index.css"
import {fetchKeyPhrasesOfPdf} from './../../store/actions/tagsActions';

class RenderDocument extends Component {

    state = {
        selected_text: "",
        pdf_documents: "",
    }

    componentDidMount = () => {
        if (this.props.pdf.pdf === undefined) {
            this.props.history.push('/annotate')
        } else {
            this.props.dispatch(fetchKeyPhrasesOfPdf(this.props.pdf.id))
            document.getElementById('roots').innerHTML = this.props.pdf.text
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


    onSelectText = () => {
        let html = this.getHTMLOfSelection();
        this.setState({
            selected_text: html,
        })
    };


    resetSelection = () => {
        this.setState({
            selected_text: ""
        });
        window.getSelection().empty()

    }


    render () {
        if (this.props.isDisplayedinDatapoints) {
            return (
              <div className="container">
                  <Paper className="datapoints">
                      <div className="textDoc" onMouseUp={this.onSelectText}>
                          {/*<Typography variant="body1" gutterBottom>*/}
                          {/*{*/}
                          {/*this.props.pdf.text*/}
                          {/*}*/}
                          {/*</Typography>*/}
                          <div id="roots">
                          </div>
                      </div>
                  </Paper>
              </div>

            );

        } else {
            return (
              <div className="container">
                  <Paper className="leftPanel">
                      <div className="textDoc" onMouseUp={this.onSelectText}>
                          <div id="roots">
                          </div>
                      </div>
                  </Paper>


                  <div className="rightPanel">
                      <Sidebar selected_text={this.state.selected_text} pdf_document={this.state.pdf_document}
                               id={this.props.pdf.id} resetSelection={this.resetSelection}
                               fulltext={this.props.pdf.text}/>
                  </div>

              </div>
            );

        }

    }
}


const mapStateToProps = state => {
    return {
        tags: state.tags,
        phrases: state.phrases.pdfPhrases,
        pdfs: state.pdfs.all_pdfs
    };
};

export default withRouter(connect(mapStateToProps)(RenderDocument));
