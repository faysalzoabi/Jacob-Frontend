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

import {fetchTagsAndDocRefs} from './../../store/actions/tagsActions';

const styles = theme => ({
  root: {
    card: {
      minWidth: 400,

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

class CardDatapoints extends Component {
  state = {
    age: '',
    name: '',
    labelWidth: 0,
  };

  componentDidMount = () => {
    this.props.dispatch(fetchTagsAndDocRefs())
  }

  render () {
    const {classes} = this.props;
    return (
      <Grid container spacing={12}>
        <Card className={classes.card}>
          <CardContent>
            <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Datapoints</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >

                  {
                    this.props.tags.map(tag => {
                      return <MenuItem>{tag.name}</MenuItem>
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

export default connect(mapStateToProps)(withStyles(styles)(CardDatapoints));