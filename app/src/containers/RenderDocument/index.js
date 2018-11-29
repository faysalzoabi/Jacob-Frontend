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

import Sidebar from '../Sidebar'
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
    let tag_id = this.props.tags.filter(tag => tag.name === event.target.value)[0].id
    this.setState({document_tags: tag_id});
  };

  onSelectText = () => {
    let html = this.getHTMLOfSelection();
    this.setState({
      selected_text: html,
    })
  };


  render () {
    const {classes} = this.props;
    return (
      <div className="container">
        <Paper className="leftPanel">
          <div className="textDoc" onMouseUp={this.onSelectText}>
            <Typography variant="body1" gutterBottom>
              {this.props.pdf.text}
            </Typography>
          </div>
        </Paper>
        <div className="rightPanel">
          <Sidebar selected_text={this.state.selected_text} pdf_document={this.state.pdf_document} id={this.props.pdf.id} />
        </div>
      </div>
    );
  }
}


export default (RenderDocument);