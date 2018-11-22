import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    width: 265,
      marginTop: 10,
  },

};

class KeyPhrase extends Component {

    render() {
              const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
          Key Phrases
                    </Typography>
                  </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(KeyPhrase);