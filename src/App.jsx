import React from 'react';
import { GameProvider } from './contexts/GameContext';
import GameBoard from './components/GameBoard/GameBoard';
import './App.css';

function App() {
  return (
    <GameProvider>
      <div className="app">
        <h1>Memory Game</h1>
        <GameBoard />
      </div>
    </GameProvider>
  );
}

export default App;