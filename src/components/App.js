import React from 'react';
import Home from './Home'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// import logo from './logo.svg';
import Slides from './Slides';
import End from './End';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div className='appcenter'>
          <Route exact path = '/' component={Home} />
          <Route path = '/slides' component={Slides} />
          <Route path = '/end' component={End} />
          </div>
        </Router>
        {/*
          <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
