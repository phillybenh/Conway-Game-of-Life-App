import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import app components
import Header from './components/Header'
import GameOfLife from './components/game/Game'
import Rules from './components/Rules';
import Background from './components/Background';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className="mainContainer">
        <Header />
        <section className="mainComponents">
          <Background />
          <Rules />
          <GameOfLife />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;
