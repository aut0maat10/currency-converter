import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CurrencyConverter from './CurrencyConverter';


class App extends Component {
  render() {
    return <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title text-warning">currency converter</h1>
        </header>
        <CurrencyConverter />
      </div>;
  }
}

export default App;
