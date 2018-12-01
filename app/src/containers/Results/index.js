import React, {Component} from 'react';
import {connect} from 'react-redux';

import RenderDocument from '../RenderDocument';
import './index.css';

class Results extends Component {

    render () {
        return (

          <div className="textWrap">
              {
                  this.props.datapoint_pdfs.map((pdf, index) => {
                      return <RenderDocument key={index} pdf={pdf} isDisplayedinDatapoints={true}/>
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