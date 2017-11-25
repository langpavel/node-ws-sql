import React, { Component } from 'react';
import OutputContainer from './components/output/OutputContainer'
import Prompt from './components/prompt/Prompt';
import Header from './components/header/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <OutputContainer />
        <Prompt />
      </div>
    );
  }
}

export default App;
