import React, { Component } from 'react';
import "./index.css";
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';


class Login extends Component {
    state = {
        username: "",
        password: "",
    }

    emailHandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    pwdHandler = (event) => {
        this.setState(
            {
                password: event.target.value,
            })
    }

    submitHandler = () => {
        //     this.props.dispatch(login(this.state)).then(user => {
        //         // this.props.history.push("/")
        //     })
        //     this.setState({
        //         email: this.state.email,
        //         password: this.state.password,
        //     })
        //     if (localStorage) {
        //         this.props.history.push("/")
        //     } else {
        //         this.props.history.push("login/")
        //     }
    }

    render() {
        return (
            <div className="App" >
                <form>
                    <div className="usernamePassword">
                        <TextField
                            margin="dense"
                            type="text"
                            variant="outlined"
                            placeholder="email..."
                            value={this.state.email}
                            onChange={this.emailHandler} />
                        <br></br>
                        <TextField
                            margin="dense"
                            type="password"
                            variant="outlined"
                            placeholder="password..."
                            value={this.state.password}
                            onChange={this.pwdHandler} />
                    </div>
                    <div className="buttonWrapper">
                        <AwesomeButton
                            type="secondary"
                            size="large"
                            action={this.submitHandler}>
                            Login
                        </AwesomeButton>
                    </div>

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // placeholder
    }
}

const connection = connect(mapStateToProps);

const ConnectedApp = connection(Login);

export default withRouter(ConnectedApp)
