import React, {Component} from 'react';
import "./index.css"
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
