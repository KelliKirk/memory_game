import React, { useRef, useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import useGameData from '../../hooks/useGameData';
import './GameSettings.css';


const GameSettings = () => {
  const { state } = useGameContext();
  const { handleDifficultyChange, handleCardCountChange, initializeGame } = useGameData();
  const difficultyInputRef = useRef(null);
 
  // Focus on difficulty dropdown when component mounts
  useEffect(() => {
    if (difficultyInputRef.current) {
      difficultyInputRef.current.focus();
    }
  }, []);


  return (
    <div className="game-settings">
      <h2>Game Settings</h2>
     
      <div className="settings-group">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          ref={difficultyInputRef}
          value={state.difficulty}
          onChange={handleDifficultyChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
     
      <div className="settings-group">
        <label htmlFor="cardCount">Number of Cards:</label>
        <select
          id="cardCount"
          value={state.cardCount}
          onChange={handleCardCountChange}
        >
          <option value="12">12 Cards (6 Pairs)</option>
          <option value="16">16 Cards (8 Pairs)</option>
          <option value="20">20 Cards (10 Pairs)</option>
          <option value="24">24 Cards (12 Pairs)</option>
        </select>
      </div>
     
      <button onClick={initializeGame} className="start-button">
        Start Game
      </button>
    </div>
  );
};


export default GameSettings;
