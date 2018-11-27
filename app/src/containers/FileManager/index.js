import React, { Component } from 'react';
import { fetchAllPdfs } from "../../store/actions/pdfActions";
import { connect } from "react-redux"
import PropTypes from 'prop-types';
import ShowFile from "../../components/ShowFile"

class FileManager extends Component {
    state = {
        pdfs: []
    }
    render() {
        return (
            <div>
                {
                    Object.values(this.props.pdfs).map((pdf, index) => {
                        console.log(pdf);
                        <br></br>
                        return <ShowFile key={index} pdf={pdf} />;

                    }
                    )}

            </div>
        );
    }
    componentDidMount() {
        this.props.dispatch(fetchAllPdfs())
    }

}
const mapStateToProps = state => {
    return ({
        pdfs: state.pdfs,

    })
}
FileManager.propTypes = {
    pdfs: PropTypes.array
};


export default connect(mapStateToProps)(FileManager);