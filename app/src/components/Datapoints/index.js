import React, { Component } from 'react';
import "./index.css"
import CardDatapoints from "../../containers/Dropdown";
import KeyPhrase from "../Keyphrases"
import Results from './../../containers/Results';

class Datapoints extends Component {

    render() {
        return (
            <div className="container">
                <div className="leftPanel" >
                    <CardDatapoints />
                   <KeyPhrase/>
                </div>
              <Results/>
            </div>
        );
    }
}

export default Datapoints;
