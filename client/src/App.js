import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import io from 'socket.io-client'
let socket = io(`http://localhost:8080`)

class App extends Component {

 constructor(props) {
   super(props);
   this.state = {message: 'hello'};
 }

 componentDidMount() {

   fetch('/api').then((response) => {
      if(response.ok) {
        return response.json().then((json) => {
          this.setState((state,props) => ({
                message: state.message + ': ' + json.message
              }
            ));
       });
      } else {
        console.log('Network response was not ok.');
      }
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });

    socket.on('chat message', (msg) => {
        this.setState({message: msg});
    });
 }

 componentWillUnmount() {
   this.setState((state,props) => ({
      message: state.message + ' unmounted'
     }
   ));
 }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          {this.state.message}
        </p>
      </div>
    );
  }
}

export default App;
