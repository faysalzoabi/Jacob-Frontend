import React, { Component } from 'react';
import "./index.css"
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { connect } from 'react-redux';
import { fetchTagsAndDocRefs } from "../../store/actions/tagsActions"
import Paper from '@material-ui/core/Paper';
import { fetchPdfs } from "../../store/actions/pdfActions"


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
        highlighted_text: "",
        tag: {},
        documentID: "",
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

    highlightSelected = () => {
        let html = this.getHTMLOfSelection()
        console.log(html)
        this.setState({
            highlighted_text: html,
        })
    }
    handler = () => {
        this.highlightSelected()
    }
    allDocumentHandler = () => {
        //  console.log(document.getElementById("text").focus())
    }
    render() {
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
                    <h3>or</h3>
                    <h1>Selected text:</h1>
                    <p>{this.state.highlighted_text}</p>

                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Tags</InputLabel>
                            <Select
                                value={this.state.tag}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'tag',
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
                    <Button variant="contained" size="small" className={classes.button}>
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
        pdfs: state.pdfs
    };
};

export default connect(mapStateToProps)(withStyles(styles)(RenderDocument));