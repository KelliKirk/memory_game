import React from 'react';
import { useGameContext } from '../../contexts/GameContext';
import './ScoreBoard.css';


const ScoreBoard = () => {
  const { state } = useGameContext();
 
  return (
    <div className="score-board">
      <div className="score-item">
        <span>Score:</span>
        <span className="score-value">{state.score}</span>
      </div>
      <div className="score-item">
        <span>Moves:</span>
        <span className="score-value">{state.moves}</span>
      </div>
      <div className="score-item">
        <span>Difficulty:</span>
        <span className="score-value">
          {state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1)}
        </span>
      </div>
    </div>
  );
};


export default ScoreBoard;