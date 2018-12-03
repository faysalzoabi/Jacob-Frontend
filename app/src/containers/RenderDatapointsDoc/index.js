import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import "./index.css"
import {fetchKeyPhrasesOfPdf} from './../../store/actions/tagsActions';

class RenderDatapointsDoc extends Component {


    componentDidMount = () => {
        this.onHighlichtClick = (e) => {
            e = e || window.event;
            let target = e.target || e.srcElement,
              text = target.textContent || target.innerText;
            console.log(e.target.title)
            // alert(e.srcElement)
        }
        document.addEventListener('click', this.onHighlichtClick, false);
    };
    componentWillUnmount = () => {
        document.removeEventListener('click', this.onHighlichtClick)
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
                      <div dangerouslySetInnerHTML={{__html: this.props.pdf.text}}>
                      </div>
                  </div>
              </Paper>
          </div>

        );
    }
}

export default RenderDatapointsDoc;
