import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {loginUser} from '../../store/actions/authActions';
import Error from '../Error/';
import {AwesomeButton} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './index.css'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: 'user01',
      password: 'screencast',
      redirect: false,
      error: ''
    };
    this.classes = props.classes;
  }

  handleUsernameInput = e => {
    const username = e.target.value;
    this.setState({username});
  }

  handlePasswordInput = e => {
    const password = e.target.value;
    this.setState({password});
  }

  userLogin = e => {
    e.preventDefault();
    const action = loginUser(this.state);
    this.props.dispatch(action).then((data) => {
      if (data.non_field_errors === undefined) {
        this.props.history.push('/');
      } else {
        this.setState({error: data.non_field_errors[0]});
      }
    });

    this.setState({
      username: '',
      password: '',
      redirect: true
    });
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.userLogin(e);
    }
  }

  render () {
    return (

      <form className="Login-Form" onSubmit={this.userLogin}>
        <Error error={this.state.error}/>
        <TextField
          id="username"
          label="Username"
          className={this.classes.textField}
          placeholder="Enter your Username"
          value={this.state.username}
          onChange={this.handleUsernameInput}
          onKeyPress={this.handleKeyPress}
        /><br/>
        <TextField
          id="password"
          label="Password"
          className={this.classes.textField}
          type="password"
          placeholder="Enter your Password"
          value={this.state.password}
          onChange={this.handlePasswordInput}
          onKeyPress={this.handleKeyPress}
        /><br/>
        <AwesomeButton
          type="secondary"
          size="large"
          onClick={this.userLogin}>
          Login
        </AwesomeButton>
      </form>

    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    token: state.token,
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Login)));
