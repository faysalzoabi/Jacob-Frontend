import React, { Component } from 'react';
import Header from "../header"
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


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
        multiline: 'Controlled',
    }
    render() {
        this.handleChange = name => event => {
            this.setState({
                [name]: event.target.value,
            });
        };
        const { classes } = this.props;

        return (
            <div>
                <Header />
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
                <Button variant="contained" color="secondary" className={classes.button}>
                    Jacob, Search!
        <Icon className={classes.rightIcon}>search</Icon>
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Homepage);
