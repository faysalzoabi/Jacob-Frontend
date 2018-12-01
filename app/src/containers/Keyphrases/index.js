import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card/Card";
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = {
    card: {
        marginTop: 10,
    },

};

class KeyPhrase extends Component {


    render () {
        const {classes} = this.props;

        if (this.props.phrases && this.props.phrases.length !== 0) {
            return (
              <Card className={classes.card}>
                  <Typography variant="body2" gutterBottom>
                      Keyphrases:
                  </Typography>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start">            {/* <Typography className={classes.title} color="textPrimary" gutterBottom> */}
                      {
                          this.props.phrases.map((phrase, index) =>
                            <Paper key={index}>{phrase.selected_text}</Paper>)
                      }
                      {/* </Typography> */}
                  </Grid>
              </Card>
            )
        }
        else {
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        tags: state.tags,
        phrases: state.phrases.tagPhrases
    };
};
export default connect(mapStateToProps)(withStyles(styles)(KeyPhrase));