import React, { Component } from 'react';
import OutputList from './components/output/OutputList'
import Prompt from './components/prompt/Prompt';
import Header from './components/header/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <OutputList />
        <Prompt />
      </div>
    );
  }
}

export default App;
