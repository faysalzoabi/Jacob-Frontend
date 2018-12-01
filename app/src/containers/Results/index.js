import React, {Component} from 'react';
import {connect} from 'react-redux';

import RenderDatapointsDoc from '../RenderDatapointsDoc';
import './index.css';

class Results extends Component {

    render () {
        return (

          <div className="textWrap">
              {
                  this.props.datapoint_pdfs.map((pdf, index) => {
                      return <RenderDatapointsDoc key={index} pdf={pdf}/>
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