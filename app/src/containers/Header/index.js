import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Logout from './../Logout';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 0,
  },
})

class Header extends Component {


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense">
            <Typography variant="headline" color="inherit" className={classes.grow}>
              Jacob
            </Typography>
            {localStorage.getItem("token") ?
              <div>
                <Button color="inherit" onClick={() => this.props.history.push('/')}>Search</Button>
                <Button color="inherit" onClick={() => this.props.history.push('/upload')}>Upload</Button>
                <Button color="inherit" onClick={() => this.props.history.push('/datapoints')}>Datapoints</Button>
                <Button color="inherit" onClick={() => this.props.history.push('/docs')}>Documents</Button>

                <Logout />
              </div>
              :
              <Button color="inherit" onClick={() => this.props.history.push('/login')}>Login</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Header));
