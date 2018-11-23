import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
  loginHandler = () => {
    this.props.history.push('/login')
  }

  render () {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon/>
            </IconButton>
            {/* the ternary operator checks if the user is logged in (if not it shows the login button) */}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Jacob
            </Typography>
            {localStorage.getItem("token") ?
              <Logout/>
              :
              <Button color="inherit" onClick={this.loginHandler}>Login</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Header));
