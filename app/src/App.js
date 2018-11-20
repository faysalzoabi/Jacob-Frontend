import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from "./components/header"
class App extends Component {
  render() {
    console.log("token in app render", localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      return (
        <div className="App">
          <Switch>
            <Header />
            <h1>PLACEHOLDER FOR COMPONENTS WITH TOKEN</h1>

          </Switch>
        </div>
      )
    }
    else {
      return (
        < div className="App" >
          <Switch>
            <Header />

            <h1>PLACEHOLDER FOR COMPONENTS no TOKEN</h1>

          </Switch>
        </div >
      )
    }
  };

}

export default App;
