import React, { Component } from 'react';
import OutputContainer from './components/output/OutputContainer'
import Prompt from './components/prompt/Prompt';
import Logo from './components/Logo';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Logo className="App-logo" arrowColor="#777777" arrowStroke="#777777" size={48} />
          <h1 className="App-title">psql</h1>
        </header>
        <OutputContainer />
        <Prompt />
      </div>
    );
  }
}

export default App;
