import React from "react";
import {GameProvider} from './components/contexts/GameContext';
import GameBoard from './components/GameBoard/GameBoard';
import './App.css';

function App() {
  return (
    <GameProvider>
      <div className="app">
        <h1>Animal Memory Game</h1>
        <GameBoard></GameBoard>
      </div>
    </GameProvider>
  )
  
}

export default App;