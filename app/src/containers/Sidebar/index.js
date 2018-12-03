import React, { Component } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { postAnnotations } from "../../store/actions/annotateActions";
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchTagsAndDocRefs } from "../../store/actions/tagsActions"
import Dropdown from './../../containers/Dropdown'
import { fetchAllPdfs } from "../../store/actions/pdfActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./index.css"


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,

    },
});

class Sidebar extends Component {


    state = {
        selectedTag: {},
        allText: false,
    }



    notifyTag = () => toast.error("Please Select a Tag!", {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    notifyText = () => toast.error("The Selected Text Is Empty!", {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    notifySuccess = () => toast.success("Highlight Done Correctly!", {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    notifyAllText = () => toast.success("All text is selected!", {
        position: toast.POSITION.BOTTOM_RIGHT
    });


    dropdownHandleChange = (tag) => {
        this.setState({ selectedTag: tag });
    };

    saveHandler = () => {
        if (this.state.allText || this.props.selectedText) {
            if (Object.keys(this.state.selectedTag).length < 1) {
                return this.notifyTag()

            }
            else {
                this.props.dispatch(postAnnotations({
                    selected_text: this.state.allText ? this.props.pdf.text : this.props.selectedText,
                    document_tags: this.state.selectedTag.id,
                    pdf_documents: this.props.pdf.id,
                })).then(() => {
                    this.props.dispatch(fetchAllPdfs())
                    this.notifySuccess()
                })
            }

        }
        else {
            return this.notifyText()
        }

        this.props.resetSelection()
    };

    allDocumentHandler = () => {
        let newAllText = !this.state.allText
        this.setState({
            allText: newAllText
        })
        this.notifyAllText()

    };


    render() {
        const { classes } = this.props;
        return (
            <div className="sidebar">
                <Button variant="contained" color="primary" onClick={this.allDocumentHandler} className={classes.button}>
                    Select All Text
              </Button>
                <Paper>
                    <div className="highlightedText">

                        {

                            this.state.allText
                                ?
                                <Typography variant="subheading" gutterBottom>
                                    All text selected.
                            </Typography>
                                :
                                this.props.selectedText
                                    ?
                                    <Typography variant="body1" gutterBottom>
                                        {this.props.selectedText}
                                    </Typography>
                                    :
                                    <Typography variant="subheading" gutterBottom>
                                        Please select the text to annotate
                              </Typography>
                        }

                    </div>
                    <Dropdown dropdownHandleChange={this.dropdownHandleChange} />
                    <Button variant="contained" size="small" className={classes.button} onClick={this.saveHandler}>
                        <SaveIcon />
                        Save
                  </Button>
                </Paper>
                <ToastContainer />
            </div>
        );
    }

    componentDidMount = () => {
        this.props.dispatch(fetchTagsAndDocRefs())
    }

}

const mapStateToProps = state => {
    return {
        tags: state.tags,
        pdfs: state.pdfs.all_pdfs
    };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Sidebar)));