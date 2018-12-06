import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router';
import "./index.css"

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

const paperStyle = {
    marginTop: "2%",
    width: "60%",
    padding: "1% 1% 1% 1%",
    background: "#d8d6d6",
};


class TextResults extends Component {

    handleClick = () => {
        this.props.history.push(`/annotate/`);
    }

    render() {
        const { texts } = this.props;
        console.log('props', texts);
        let textListContent;
        let textarr = [];
        texts.forEach(ele => textarr.push(ele.highlight.text))
        let result = [].concat.apply([], textarr);
        if (texts) {
            textListContent = (
                <div className="result">
                    {result.map(t => (
                        <Paper style={paperStyle} className="box" elevation={10} onClick={this.handleClick}>
                            {<p dangerouslySetInnerHTML={{ __html: t }} />}
                        </Paper>
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

export default withStyles(styles)(withRouter(TextResults));