import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

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
  loginHandler = () => {
    this.props.history.push('/login')
  }
  logoutHandler = () => {
    localStorage.clear()
    this.props.history.push('/')

  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            {/* the ternary operator checks if the user is logged in (if not it shows the login button) */}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Jacob
            </Typography>
            {localStorage.getItem("token") ?
              <Button color="inherit" onClick={this.logoutHandler}>Logout</Button>
              :
              <Button color="inherit" onClick={this.loginHandler}>Login</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
