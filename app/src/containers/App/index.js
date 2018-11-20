import React, {Component} from 'react';
import Header from './../Header'
import './index.css';

class App extends Component {
  render () {
    if (localStorage.getItem('token')) {
      return (
        <div className="App">
          Token is in localstorage.
        </div>
      )
    }
    else {
      return (
        < div className="App">
          <Header/>
          No token is in localstorage.
        </div>
      )
    }
  };

}

export default App;
