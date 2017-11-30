import React, { Component } from 'react';
import Output from './components/output/Output'
import Prompt from './components/prompt/Prompt';
import Header from './components/header/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Output />
        <Prompt />
      </div>
    );
  }
}

export default App;
