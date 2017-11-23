import React, { Component } from 'react';
import OutputContainer from './components/output/OutputContainer'
import Prompt from './components/prompt/Prompt';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">psql</h1>
        </header>
        <OutputContainer />
        <Prompt />
      </div>
    );
  }
}

export default App;
