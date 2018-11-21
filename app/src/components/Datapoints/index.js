import React, {Component} from 'react';
import "./index.css"
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },

});


class Datapoints extends Component {
  state = {
    age: 'fdfdfdfdfdf',
    name: '',
    labelWidth: 0,
  };


    render() {
      const { classes } = this.props;

        return (
            <div className="container">
                <div className="leftPanel" >
                          <Grid container spacing={8}
                          >
                              <br></br>
                                <Grid item xs={12}>
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
                                                  <MenuItem value="Datapoints">
                                              <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                          </Select>
                                        </FormControl>
                                   </form>
                                </Grid>
                          </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Datapoints);
