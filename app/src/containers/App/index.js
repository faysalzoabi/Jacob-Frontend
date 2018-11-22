import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './../Header'
import Login from './../Login'
import Logout from './../Logout'
import Redirect from '../Redirect';
import Datapoints from './../../components/Datapoints';
import Homepage from './../../components/Homepage';

import './index.css';

class App extends Component {
  render () {
    if (localStorage.getItem('token')) {
      return (
        <div className="App">
          <Header/>
          <Switch>
            <Route exact path="/datapoints" component={Datapoints}/>
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/login" render={() => <Redirect path="/datapoints"/>}/>
            <Route render={() => <p>404 - Page not found!</p>}/>
          </Switch>
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <Header/>
          <div className="main-container">
            <Switch>
              <Route exact path="/login" component={Login}/>
              <Route render={() => <Redirect path="/login"/>}/>

            </Switch>
          </div>
        </div>
      )
    }
  };

}

export default App;
