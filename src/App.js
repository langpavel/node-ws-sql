import React, { Component } from 'react';
import Output from './components/output/Output'
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
          <a className="nodeknockout" href="https://www.nodeknockout.com/entries/313-pgsql-web-interface" target="_blank">Vote !</a>
        </header>
        <Output />
        <Prompt />
      </div>
    );
  }
}

export default App;
