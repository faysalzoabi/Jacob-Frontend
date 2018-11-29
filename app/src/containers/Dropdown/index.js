import React, {Component} from 'react';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from "@material-ui/core";
import {connect} from 'react-redux';
import {setDatapointsPdfs} from './../../store/actions/pdfActions';
import {fetchKeyPhrasesOfTag} from "../../store/actions/tagsActions";
import "./index.css";

const styles = theme => ({
    root: {
        card: {
            minWidth: 400,
            width: '100%'

        },
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,

    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },


});

class Dropdown extends Component {
    state = {
        currentTag: {},
        level1Selected: {},
        level2Options: [],
        level2Selected: {},
        level3Options: [],
        level3Selected: {},
    };

    handleChange = (option) => {
        let pdfIndexes = this.props.tags.filter(tag => tag.name === option.name)[0]['pdf_documents']
        this.props.dispatch(setDatapointsPdfs(pdfIndexes))
        this.props.dispatch(fetchKeyPhrasesOfTag(this.state.currentTag.id))
    }

    onLevel1Selected = (option) => {
        let level2Options = this.props.tags.filter(tag => tag.parent_tag === option.id)
        this.setState({currentTag: option, level1Selected: option, level2Options: level2Options})
        this.handleChange(option)
    }

    onLevel2Selected = (option) => {
        let level3Options = this.props.tags.filter(tag => tag.parent_tag === option.id)
        this.setState({currentTag: option, level2Selected: option, level3Options: level3Options})
        this.handleChange(option)
    }

    onLevel3Selected = (option) => {
        this.setState({currentTag: option, level3Selected: option })
        this.handleChange(option)
    }

    renderLevel1 = () => {
        let level1Tags = this.props.tags.filter(tag => tag.parent_tag === null)
        return (
          <div className="dropdown-colum">
              {
                  this.state.level1Selected.name ?
                    <p style={{fontSize: '10px'}}>Tag1: {this.state.level1Selected.name.substr(0, 9)}...</p>
                    : null
              }
              {
                  level1Tags.map(option => {
                      return <div onClick={() => this.onLevel1Selected(option)}
                                  className="dropdown-cell"
                                  style={{backgroundColor: option.color}}>{option.name}</div>
                  })
              }
          </div>
        )
    }

    renderLevel2 = () => {
        return (
          Object.keys(this.state.level2Options).length > 0
            ? <div className="dropdown-colum">
                {
                    this.state.level2Selected.name ?
                      <p style={{fontSize: '10px'}}>Tag2: {this.state.level2Selected.name.substr(0, 9)}...</p>
                      : null
                }
                {
                    this.state.level2Options.map(option => {
                        return <div onClick={() => this.onLevel2Selected(option)}
                                    className="dropdown-cell"
                                    style={{backgroundColor: option.color}}>{option.name}</div>
                    })
                }
            </div>
            :
            null
        )
    }

    renderLevel3 = () => {
        return (
          Object.keys(this.state.level3Options).length > 0
            ? <div className="dropdown-colum">
                {
                    this.state.level3Selected.name ?
                      <p style={{fontSize: '10px'}}>Tag3: {this.state.level3Selected.name.substr(0, 9)}...</p>
                      : null
                }
                {
                    this.state.level3Options.map(option => {
                        return <div onClick={() => this.onLevel3Selected(option)}
                                    className="dropdown-cell"
                                    style={{backgroundColor: option.color}}>{option.name}</div>
                    })
                }
            </div>
            :
            null
        )
    }

    render () {
        if (this.props.tags.length > 0) {
            return (
              <div>
                  <h3>Tags</h3>
                  <div className="dropdown">
                      {
                          this.renderLevel1()
                      }
                      {
                          this.renderLevel2()
                      }
                      {
                          this.renderLevel3()
                      }
                  </div>
                  <div style={{backgroundColor: this.state.currentTag.color}}><h4>Current Tag:</h4> {this.state.currentTag.name}</div>
              </div>
            )
        } else {
            return <div>Loading</div>
        }

    }
}


const mapStateToProps = state => {
    return {
        tags: state.tags,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Dropdown));