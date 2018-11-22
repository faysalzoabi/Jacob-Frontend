import React, { Component } from 'react';
import "./index.css"
import CardDatapoints from "./components/dropdown";
import KeyPhrase from "./components/keyphrases"

class Datapoints extends Component {

    render() {
        return (
            <div className="container">
                <div className="leftPanel" >
                    <CardDatapoints />
                   <KeyPhrase/>
                </div>
            </div>
        );
    }
}

export default (Datapoints);
