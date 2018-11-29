import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import "./index.css"
import {fetchTagsAndDocRefs} from "../../store/actions/tagsActions"
import { postAnnotations } from "../../store/actions/annotateActions";

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

class RenderDocument extends Component {

    state = {
        selected_text: "",
        document_tags: "",
        pdf_documents: "",
    }

    componentDidMount = () => {
        const pdfId = this.props.match.params.pdfId
        this.props.dispatch(fetchTagsAndDocRefs())
        this.props.dispatch(fetchPdfs([pdfId]))
    }

    getHTMLOfSelection = () => {
        let range;
        if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            return range.htmlText;
        }
        else if (window.getSelection) {
            let selection = window.getSelection();
            if (selection.rangeCount > 0) {
                range = selection.getRangeAt(0);
                let clonedSelection = range.cloneContents();
                let div = document.createElement('div');
                div.appendChild(clonedSelection);
                return div.innerHTML;
            }
            else {
                return '';
            }
        }
        else {
            return '';
        }
    }
    handleChange = (event) => {
        console.log(event)
        this.setState({ document_tags: event.target });
    };

    highlightSelected = () => {
        let html = this.getHTMLOfSelection()
        console.log(html)
        this.setState({
            selected_text: html,
        })
    }
    handler = () => {
        this.highlightSelected()
    }
    allDocumentHandler = () => {
        //  console.log(document.getElementById("text").focus())
    }
    saveHandler = () => {
        const pdfId = this.props.match.params.pdfId
        this.setState({
            pdf_documents: Number(pdfId)
        })
        this.props.dispatch(postAnnotations(this.state))

    }
    render() {
        console.log(this.state);

        const { classes } = this.props;
        console.log(this.props.pdfs[0].text);
        return (
            <div className="container">
                <Paper className="leftPanel"
                >
                    <div className="textDoc" onMouseUp={this.handler}>
                        {this.props.pdfs[0].text}
                    </div>
                </Paper>
                <Paper className="rightPanel">

                    <Button variant="outlined" color="secondary" className={classes.button} onClick={this.allDocumentHandler}
                    >
                        Select all text of the Document
                    </Button>
                    <Typography variant="subtitle1" gutterBottom>
                        or
      </Typography>
                    <Typography component="h2" variant="h1" gutterBottom>
                        Selected Text:
                        </Typography>
                    <div className="highlightedText">
                        {this.state.highlighted_text}
                    </div>
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="tag_dropdown">Tags</InputLabel>
                            <Select
                                value={this.state.tag}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'document_tags',
                                }}
                            >
                                {
                                    this.props.tags.map((tag, index) => {
                                        return <MenuItem key={index} value={tag.name}>{tag.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </form>
                    <Button variant="contained" size="small" className={classes.button} onClick={this.saveHandler}>
                        <SaveIcon />
                        Save
                </Button>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    tags: state.tags,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(RenderDocument));