import React, {Component} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {postAnnotations} from "../../store/actions/annotateActions";
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {fetchTagsAndDocRefs} from "../../store/actions/tagsActions"
import "./index.css"
import Dropdown from './../../containers/Dropdown'
import {fetchAllPdfs, setAnnotationPdf} from "../../store/actions/pdfActions";


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
        document_tags: "",
        pdf_document: "",
        alltext: false,
    }

    dropdownHandleChange = (tag) => {
        this.setState({document_tags: tag.id});
    };

    saveHandler = () => {
        if (this.props.selected_text || this.state.alltext) {
            if (!this.state.document_tags) {
                alert("Please select a tag.")
            }
            else if (this.state.alltext) {
                this.props.dispatch(postAnnotations({
                    selected_text: this.props.fulltext,
                    document_tags: this.state.document_tags,
                    pdf_documents: this.props.id,
                })).then(() => {
                    this.props.dispatch(fetchAllPdfs())
                      .then(() => {
                          this.props.dispatch(setAnnotationPdf(this.props.pdfs.filter(pdf => pdf.id === this.props.id)[0]))
                      })

                })
            }
            else {
                this.props.dispatch(postAnnotations({
                    selected_text: this.props.selected_text,
                    document_tags: this.state.document_tags,
                    pdf_documents: this.props.id,
                })).then(() => {
                    this.props.dispatch(fetchAllPdfs())
                      .then(() => {
                          this.props.dispatch(setAnnotationPdf(this.props.pdfs.filter(pdf => pdf.id === this.props.id)[0]))
                      })

                })
            }
        }
        else {
            alert("The selected text is empty.")
        }


        this.setState({
            pdf_document: this.props.pdf
        });

        this.props.resetSelection()
    };

    allDocumentHandler = () => {
        let newAllText = !this.state.alltext
        this.setState({
            alltext: newAllText
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
                  <div className="highlightedText" onChange={this.textHandler}>

                      {

                          this.state.alltext
                            ?
                            <Typography variant="subheading" gutterBottom>
                                All text selected.
                            </Typography>
                            :
                            this.props.selected_text
                              ?
                              <Typography variant="body1" gutterBottom>
                                  {this.props.selected_text}
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

export default connect(mapStateToProps)(withStyles(styles)(Sidebar));