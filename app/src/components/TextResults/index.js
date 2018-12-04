import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import "./index.css"
const styles = theme => ({
    root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class TextResults extends Component {

    handleClick=() => {
        // this.props.history.push(`/questions/${texts.order}`)
    }

    render() {
        const { classes, texts } = this.props;
        console.log('props', texts);
        let textListContent;
        let textarr = [];
        texts.forEach(ele => textarr.push(ele.highlight.text))
        let result = [].concat.apply([], textarr);
        if(texts) {
        textListContent = (
            <div className="container">
                {result.map(t => (
                    <div className="box" onClick={this.handleClick}>
                                  {<p dangerouslySetInnerHTML={ { __html: t } } />}
                    </div>
                ))}
            </div>
        )
      } else {
          textListContent = null;
      }
        return (
            <div>
                {textListContent}
            </div>
        );
    }
}

export default withStyles(styles)(TextResults);