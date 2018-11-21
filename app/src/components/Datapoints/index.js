import React, {Component} from 'react';
import "./index.css"
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardDatapoints from "./components/index"


class Datapoints extends Component {



    render() {
      const { classes } = this.props;

        return (
            <div className="container">
                <div className="leftPanel" >
                    <br></br>
                <CardDatapoints/>
                </div>
            </div>
        );
    }
}

export default (Datapoints);
