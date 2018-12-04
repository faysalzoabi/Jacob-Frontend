import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux"

import {setDatapointsPdf} from './../../store/actions/pdfActions';

const styles = {
    card: {
        width: "100%",
        marginTop: '2%'
    }
};

class DocumentPreview extends Component {

    clickHandler = () => {
        this.props.dispatch(setDatapointsPdf(this.props.pdf))
    }

    render () {
        const {classes} = this.props;

        return (
          <Card onClick={this.clickHandler} className={classes.card}>
              <CardContent>
                  <Typography variant="body1" gutterBottom>
                      {this.props.pdf.pdf.split('/').reverse()[0]}
                  </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
          </Card>

        );
    }
}


export default withRouter(withStyles(styles)(connect()(DocumentPreview)))