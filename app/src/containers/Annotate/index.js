import React, {Component} from 'react';
import {fetchAllPdfs} from "../../store/actions/pdfActions";
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import DocumentPreview from "../../components/DocumentPreview";
import "./index.css";

class Annotate extends Component {

  render () {
    return (
      <div className="annotate-container">
        {
          Object.values(this.props.pdfs).map((pdf, index) => {
              console.log(pdf);
              return <DocumentPreview key={index} pdf={pdf}/>;
            }
          )}

      </div>
    );
  }

  componentDidMount () {
    this.props.dispatch(fetchAllPdfs())
  }

}

const mapStateToProps = state => {
  return ({
    pdfs: state.pdfs,

  })
}

Annotate.propTypes = {
  pdfs: PropTypes.array
};


export default connect(mapStateToProps)(Annotate);