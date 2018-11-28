import React, {Component} from 'react';
import Dropdown from "../../containers/Dropdown";
import KeyPhrase from "../../containers/Keyphrases"
import Results from './../../containers/Results';
import "./index.css"
import {fetchTagsAndDocRefs} from "../../store/actions/tagsActions";
import {connect} from "react-redux";


class Datapoints extends Component {

  componentWillMount = () => {
    this.props.dispatch(fetchTagsAndDocRefs())
  }


  render () {
    return (
      <div className="container-datapoints">
        <div className="leftPanel-datapoints">
          <Dropdown/>
          <KeyPhrase/>
        </div>
        <div className="rightPanel-datapoints">
          <Results/>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    tags: state.tags,
  };
};
export default connect(mapStateToProps)(Datapoints);
