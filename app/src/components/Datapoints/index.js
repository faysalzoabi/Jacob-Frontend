import React, {Component} from 'react';
import Dropdown from "../../containers/Dropdown";
import KeyPhrase from "../../containers/Keyphrases"
import Results from './../../containers/Results';
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import DatapointsDocumentPreview from './../DatapointsDocumentPreview';
import "./index.css"

class Datapoints extends Component {

    render () {
        return (
          <div className="container">
              <div className="container-datapoints">
                  <Paper className="leftPanel-datapoints">
                      <Dropdown/>
                      <h3>Documents</h3>
                      {
                          Object.values(this.props.pdfs).reverse().map((pdf, index) => {
                                return <DatapointsDocumentPreview key={index} pdf={pdf}/>;
                            }
                          )}
                      <KeyPhrase/>
                  </Paper>
                  <div className="rightPanel-datapoints">
                      <div className="text">
                          <Results/>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        tags: state.tags,
        pdfs: state.pdfs.datapoint_pdfs
    };
};
export default connect(mapStateToProps)(Datapoints);
