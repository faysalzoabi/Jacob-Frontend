import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from "./components/header"
import Homepage from "./components/Homepage"
class App extends Component {
  render() {
    console.log("token in app render", localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      return (
        <div className="App">
          <Switch>
            <Route exact path='/' component={Homepage} />
          </Switch>
        </div>
      )
    }
    else {
      return (
        < div className="App" >
          <Switch>
            <Route exact path='/' component={Homepage} />
          </Switch>
        </div >
      )
    }
  };

}

export default App;
