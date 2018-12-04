import React, {Component} from 'react';
import Dropdown from "../../containers/Dropdown";
import KeyPhrase from "../../containers/Keyphrases"
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import DatapointsDocumentPreview from './../DatapointsDocumentPreview';
import RenderDatapointsDoc from './../../containers/RenderDatapointsDoc';

import "./index.css"

class Datapoints extends Component {

    render () {
        return (
          <div className="container">
              <div className="container-datapoints">
                  <Paper className="leftPanel-datapoints">
                      <Dropdown/>
                      {/*Put below into own component*/}
                      <h3>Documents</h3>
                      {
                          Object.values(this.props.pdfs).reverse().map((pdf, index) => {
                                return <DatapointsDocumentPreview key={index} pdf={pdf}/>;
                            }
                          )}
                      {/*Until here*/}
                      <KeyPhrase/>
                  </Paper>
                  <div className="rightPanel-datapoints">
                      {
                          Object.keys(this.props.pdf).length > 0 ?
                            <div className="text">
                                <RenderDatapointsDoc pdf={this.props.pdf}/>
                            </div>
                            : null
                      }
                  </div>
              </div>
          </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        tags: state.tags,
        pdfs: state.pdfs.datapoint_pdfs,
        pdf: state.pdfs.datapoint_pdf
    };
};
export default connect(mapStateToProps)(Datapoints);
