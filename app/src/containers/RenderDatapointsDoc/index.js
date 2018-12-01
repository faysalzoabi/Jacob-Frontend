import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import "./index.css"
import {fetchKeyPhrasesOfPdf} from './../../store/actions/tagsActions';

class RenderDatapointsDoc extends Component {
    componentDidMount = () => {
        this.props.dispatch(fetchKeyPhrasesOfPdf(this.props.pdf.id))
        document.getElementById('roots').innerHTML = this.props.pdf.text
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
            selectedText: html,
        })
    };


    resetSelection = () => {
        this.setState({
            selectedText: ""
        });
        window.getSelection().empty()

    }


    render () {
        return (
          <div className="container">
              <Paper className="datapoints">
                  <div className="textDoc" onMouseUp={this.onSelectText}>
                      <div id="roots">
                      </div>
                  </div>
              </Paper>
          </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        pdfs: state.pdfs.all_pdfs
    };
};

export default withRouter(connect(mapStateToProps)(RenderDatapointsDoc));
