import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const styles = {
    card: {
        Width: 100,
    }
};

class ShowFile extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="body1" gutterBottom>
                            {this.props.pdf.pdf.split('/').reverse()[0]}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            open
                        </Button>
                    </CardActions>
                </Card>
                <br></br>
            </div>
        );
    }
}



export default withStyles(styles)(ShowFile);
