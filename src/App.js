// App.js

import React from 'react';
import './App.css';
import TimeZoneConverter from './components/TimeZoneConverter/TimeZoneConverter';
import earth from './assets/earth.mp4';

function App() {
  return (
    <div className="app-container">
      <video autoPlay loop muted className="video-bg">
        <source src={earth} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content-container">
        <div className="App">
          <h1>Time Converter</h1>
          <TimeZoneConverter />
        </div>
      </div>
    </div>
  );
}

export default App;
