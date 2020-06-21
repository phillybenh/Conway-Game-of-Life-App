import React from 'react';
import './App.css';

// import app components
import Header from './components/Header'
import GameOfLife from './components/Game'

function App() {
  return (
    <div className="App">
      <Header />
      <GameOfLife />
    </div>
  );
}

export default App;
