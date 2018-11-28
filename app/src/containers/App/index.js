import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './../Header'
import Login from './../Login'
import Redirect from '../Redirect';
import Datapoints from './../../components/Datapoints';
import Search from './../../components/Search';
import Upload from "../Upload"
import './index.css';
import RenderDocument from '../RenderDocument';
import FileManager from "../FileManager"

class App extends Component {
  render () {
    if (localStorage.getItem('token')) {
      return (
        <div className="App">
          <Header/>
          <Switch>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/upload" component={Upload}/>
            <Route exact path="/datapoints" component={Datapoints}/>
            <Route exact path="/docs" component={FileManager}/>
            <Route exact path="/annotate/:pdfId" component={RenderDocument}/>
            <Route exact path="/login" render={() => <Redirect path="/search"/>}/>
            <Route render={() => <p>404 - Page not found!</p>}/>
          </Switch>
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <Header/>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route render={() => <Redirect path="/login"/>}/>
          </Switch>
        </div>
      )
    }
  };

}

export default App;
