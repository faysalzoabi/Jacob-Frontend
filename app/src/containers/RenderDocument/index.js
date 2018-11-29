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
import {postAnnotations} from "../../store/actions/annotateActions";

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
    this.props.dispatch(fetchTagsAndDocRefs())
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

  dropdownHandleChange = (event) => {
    console.log(this.props.tags)
    console.log(event)
    let tag_id = this.props.tags.filter(tag => tag.name === event.target.value)[0].id
    console.log(tag_id)
    this.setState({document_tags: tag_id});
  };

  onSelectText = () => {
    let html = this.getHTMLOfSelection();
    console.log("html", html);
    this.setState({
      selected_text: html,
    })
  };

  allDocumentHandler = () => {
    //  console.log(document.getElementById("text").focus())
  };

  saveHandler = () => {
    let data = {
      selected_text: this.state.selected_text,
      document_tags: this.state.document_tags,
      pdf_documents: this.props.pdf.id,
    }
    this.props.dispatch(postAnnotations(data))

    this.setState({
      pdf_documents: this.props.pdf.id,
      selected_text: '',
    });

    window.getSelection().empty()
  };

  render () {
    const {classes} = this.props;
    return (
      <div className="container">

        <Paper className="leftPanel">
          <div className="textDoc" onMouseUp={this.onSelectText}>
            {this.props.pdf.text}
          </div>
        </Paper>


        <Paper className="rightPanel">
          <Button variant="outlined" color="secondary" className={classes.button} onClick={this.allDocumentHandler}>
            Select all text of the Document
          </Button>
          <Typography variant="display1" gutterBottom>
            or
          </Typography>
          <Typography component="h2" variant="subheading" gutterBottom>
            Selected Text:
          </Typography>

          <div className="highlightedText">
            {this.state.selected_text}
          </div>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="tag_dropdown">Tags</InputLabel>
              <Select
                value={this.props.tags.filter(tag => tag.id === this.state.document_tags).length === 0 ? 'Select' : this.props.tags.filter(tag => tag.id === this.state.document_tags)[0].name}
                onChange={this.dropdownHandleChange}
                inputProps={{
                  name: 'tag',
                }}>
                {
                  this.props.tags.map((tag, index) => {
                    return <MenuItem key={index} value={tag.name}>{tag.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </form>
          <Button variant="contained" size="small" className={classes.button} onClick={this.saveHandler}>
            <SaveIcon/>
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