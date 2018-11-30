import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = {
  card: {
    marginTop: 10,
  },

};

class KeyPhrase extends Component {


  render() {
    console.log(this.props.phrases);
    const { classes } = this.props;
    console.log(this.props.phrases.length)


    if (this.props.phrases.length !== 0) {
      return (
        <Card className={classes.card}>
          <Typography variant="body2" gutterBottom>
            Keyphrases:
                </Typography>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              {
                this.props.phrases.map((phrase, index) => <li key={index}>{phrase.selected_text}</li>)
              }
            </Typography>
          </CardContent>
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
    phrases: state.phrases
  };
};
export default connect(mapStateToProps)(withStyles(styles)(KeyPhrase));