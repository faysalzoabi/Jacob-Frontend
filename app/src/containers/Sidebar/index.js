import React, {Component} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {postAnnotations} from "../../store/actions/annotateActions";
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {fetchTagsAndDocRefs} from "../../store/actions/tagsActions"
import "./index.css"
import Dropdown from './../../containers/Dropdown'
import {fetchAllPdfs} from "../../store/actions/pdfActions";


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

    dropdownHandleChange = (tag) => {
        this.setState({selectedTag: tag});
    };

    saveHandler = () => {
        if (this.state.allText || this.props.selectedText) {
            if (Object.keys(this.state.selectedTag).length < 1) {
                alert("Please select a tag.")
            }
            else {
                this.props.dispatch(postAnnotations({
                    selected_text: this.state.allText ? this.props.pdf.text : this.props.selectedText,
                    document_tags: this.state.selectedTag.id,
                    pdf_documents: this.props.pdf.id,
                })).then(() => {
                    this.props.dispatch(fetchAllPdfs())
                })
            }

        }
        else {
            alert("The selected text is empty.")
        }

        this.props.resetSelection()
    };

    allDocumentHandler = () => {
        let newAllText = !this.state.allText
        this.setState({
            allText: newAllText
        })
    };


    render () {
        const {classes} = this.props;
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
                  <Dropdown dropdownHandleChange={this.dropdownHandleChange}/>
                  <Button variant="contained" size="small" className={classes.button} onClick={this.saveHandler}>
                      <SaveIcon/>
                      Save
                  </Button>
              </Paper>
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