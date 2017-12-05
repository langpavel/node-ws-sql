import React, { Component } from 'react';
import Output from './components/output/Output'
import Prompt from './components/prompt/Prompt';
import Header from './components/header/Header';
import './scrollbar.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="AppScrollable">
          <Output />
          <Prompt />
        </div>
      </div>
    );
  }
}

export default App;
