import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { withRouter } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { connect } from "react-redux"
import { fetchHighlights } from "../../store/actions/highlightsActions"
import { setDatapointsPdf } from './../../store/actions/pdfActions';
import "./index.css"

const styles = {
    card: {
        width: "100%",

    }
};

class DatapointsDocumentPreview extends Component {

    clickHandler = () => {
        this.props.dispatch(setDatapointsPdf(this.props.pdf))
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className="card" onClick={this.clickHandler} >
                    <CardContent>
                        <Typography variant="body1" gutterBottom>
                            {this.props.pdf.pdf.split('/').reverse()[0]}
                            <div className="icon">
                                {
                                    this.props.highlights.map((pdf, index) => {
                                        console.log(pdf.id, this.props.pdf.id);
                                        return (pdf.id === this.props.pdf.id)
                                            ?
                                            pdf.all_doc_tagged
                                                ?
                                                <Icon className={classNames(classes.icon, "far fa-file-pdf")} />
                                                :
                                                <Icon className={classNames(classes.icon, 'fas fa-quote-right')} />
                                            :
                                            null
                                    })}
                            </div>
                        </Typography>
                    </CardContent>
                </Card >
                <br></br>
            </div>
        );
    }
    componentDidMount() {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#insertion-point-jss'),
        );
        this.props.dispatch(fetchHighlights())
    }
}
const mapStateToProps = state => {
    return {
        tags: state.tags,
        highlights: state.highlights
    };
};


export default withRouter(connect(mapStateToProps)(withStyles(styles)(DatapointsDocumentPreview)));