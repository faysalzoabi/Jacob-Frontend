import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { AwesomeButtonProgress } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Header from "../../containers/Header"

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "500px",
        marginTop: "50px",
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class Homepage extends Component {
    state = {
        multiline: '',
    }
    render() {
        this.handleChange = name => event => {
            this.setState({
                [name]: event.target.value,
            });
        };

        this.handleDrawerOpen = () => {
            this.setState({ drawerIsOpen: true });
        };

        this.handleDrawerClose = () => {
            this.setState({ drawerIsOpen: false });
        };

        const { classes } = this.props;

        return (
            <div>
                <div className="Container">
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Search:"
                        multiline
                        rowsMax="4"
                        value={this.state.multiline}
                        onChange={this.handleChange('multiline')}
                        className={classes.textField}
                        margin="normal"
                        helperText="Please write what you want to search."
                        variant="outlined"
                    />

                </div>
                <AwesomeButtonProgress
                    type="secondary"
                    size="large"
                    action={this.submitHandler}
                >
                    Search!
                </AwesomeButtonProgress>
            </div>
        );
    }
}

export default withStyles(styles)(Homepage);