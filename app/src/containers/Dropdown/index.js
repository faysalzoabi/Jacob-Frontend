import React, {Component} from 'react';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from "@material-ui/core";
import {connect} from 'react-redux';

import {setDatapointsPdfs} from './../../store/actions/pdfActions';
import {fetchKeyPhrasesOfTag} from "../../store/actions/tagsActions";


const styles = theme => ({
  root: {
    card: {
      minWidth: 400,
      width: '100%'

    },
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,

  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },

});

class Dropdown extends Component {
  state = {
    tag: '',
  };


  handleChange = (event) => {
    this.setState({tag: event.target.value})
    let pdfIndexes = this.props.tags.filter(tag => tag.name === event.target.value)[0]['pdf_documents']
    // this.props.dispatch(fetchPdfs(pdfIndexes))
    this.props.dispatch(setDatapointsPdfs(pdfIndexes))

    let tag_id = this.props.tags.filter(tag=>tag.name===event.target.value)[0].id
    this.props.dispatch(fetchKeyPhrasesOfTag(tag_id))
  }


  render () {
    const {classes} = this.props;
    return (
      <Grid style={{display: 'initial'}} container>
        <Card className={classes.card}>
          <CardContent>
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
          </CardContent>
        </Card>
      </Grid>
    );
  }
}


const mapStateToProps = state => {
  return {
    tags: state.tags,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Dropdown));