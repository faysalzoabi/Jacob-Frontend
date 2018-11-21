import React, {Component} from 'react';
import './index.css';
import Homepage from "../../components/Homepage";
import Login from "../../components/login"
import { Route, Switch } from 'react-router-dom';
import Datapoints from "../../components/Datapoints";

class App extends Component {
  render () {
    if (localStorage.getItem('token')) {
      return (
        <div className="App">
                <Switch>
            <Route exact path="/" component={ Homepage } />
                    <Route exact path="/datapoints" component={ Datapoints } />

                </Switch>
        </div>
      )
    }
    else {
      return (
        < div className="App">
           <Switch>
                                   <Route exact path="/datapoints" component={ Datapoints } />
            <Route exact path="/login" component={ Login } />
           </Switch>
        </div>
      )
    }
  };

}

export default App;
