import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

const styles = {
  card: {
    width: 265,
    marginTop: 10,
  },

};

class KeyPhrase extends Component {

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>

              {
                this.props.tags.map((tag, index) => <li key={index}>{tag.name}</li>)
              }

            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tags,
  };
};
export default connect(mapStateToProps)(withStyles(styles)(KeyPhrase));