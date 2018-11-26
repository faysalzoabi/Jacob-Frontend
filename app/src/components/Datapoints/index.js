import React, {Component} from 'react';
import CardDatapoints from "../../containers/Dropdown";
import KeyPhrase from "../Keyphrases"
import Results from './../../containers/Results';
import "./index.css"

class Datapoints extends Component {

  render () {
    return (
      <div className="container">
        <div className="leftPanel">
          <CardDatapoints/>
          <KeyPhrase/>
        </div>
        <div className="rightPanel">
          <Results/>
        </div>
      </div>
    );
  }
}

export default Datapoints;
