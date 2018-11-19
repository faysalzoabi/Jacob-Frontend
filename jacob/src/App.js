import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    console.log("token in app render", localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      return (
        <div className="App">
          <Switch>

           PLACEHOLDER FOR COMPONENTS WITH TOKEN

          </Switch>
        </div>
      )
    }
    else {
      return (
        < div className="App" >
          <Switch>

          PLACEHOLDER FOR COMPONENTS WITHOUT 
          
          </Switch>
        </div >
      )
    }
  };

}

export default App;
