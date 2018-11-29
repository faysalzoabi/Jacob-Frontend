import React, {Component} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {postAnnotations} from "../../store/actions/annotateActions";
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {fetchTagsAndDocRefs} from "../../store/actions/tagsActions"
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
        document_tags: "",
        pdf_document: "",
    }

    dropdownHandleChange = (event) => {
        let tag_id = this.props.tags.filter(tag => tag.name === event.target.value)[0].id
        this.setState({document_tags: tag_id});
    };

    saveHandler = () => {
        this.props.dispatch(postAnnotations({
            selected_text: this.props.selected_text,
            document_tags: this.state.document_tags,
            pdf_documents: this.props.id,
        }))


        this.setState({
            pdf_document: this.props.pdf
        });

        this.props.resetSelection()
    };

    allDocumentHandler = () => {
        //  console.log(document.getElementById("text").focus())
    };


    render () {
        const {classes} = this.props;
        return (
          <div>
              <Paper>
                  <Button variant="outlined" color="secondary" className={classes.button}
                          onClick={this.allDocumentHandler}>
                      Select all text of the Document
                  </Button>
                  <Typography variant="display1" gutterBottom>
                      or
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                      Selected Text:
                  </Typography>
                  <div className="highlightedText" onChange={this.textHandler}>
                      <Typography variant="body1" gutterBottom>{this.props.selected_text}</Typography>
                  </div>
                  <form className={classes.root} autoComplete="off">
                      <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="tag_dropdown">Tags</InputLabel>
                          <Select
                            value={this.props.tags.filter(tag => tag.id === this.state.document_tags).length === 0 ? 'Select' : this.props.tags.filter(tag => tag.id === this.state.document_tags)[0].name}
                            onChange={this.dropdownHandleChange}
                            inputProps={{name: 'tag'}}>
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

    componentDidMount = () => {
        this.props.dispatch(fetchTagsAndDocRefs())
    }
}

const mapStateToProps = state => {
    return {
        tags: state.tags,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Sidebar));