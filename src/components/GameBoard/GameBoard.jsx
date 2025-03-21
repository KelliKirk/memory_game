import React, { useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import useGameData from '../../hooks/useGameData';
import Card from '../Card/Card';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import GameSettings from '../GameSettings/GameSettings';
import './GameBoard.css';


const GameBoard = () => {
  const { state } = useGameContext();
  const { handleCardClick, initializeGame, resetGame } = useGameData();


  // Log game activity
  useEffect(() => {
    console.log('Game state updated:', {
      score: state.score,
      moves: state.moves,
      matchedPairs: state.matchedPairs.length,
      totalPairs: state.cardCount / 2
    });
  }, [state.score, state.moves, state.matchedPairs.length, state.cardCount]);


  // Get grid class based on card count
  const getGridClass = () => {
    switch (state.cardCount) {
      case 12:
        return 'grid-cols-4';
      case 16:
        return 'grid-cols-4';
      case 20:
        return 'grid-cols-5';
      case 24:
        return 'grid-cols-6';
      default:
        return 'grid-cols-4';
    }
  };


  return (
    <div className="game-board">
      {!state.gameStarted ? (
        <GameSettings />
      ) : (
        <div className="game-content">
          <ScoreBoard />
         
          <div className={`cards-grid ${getGridClass()}`}>
            {state.cards.map(card => (
              <Card
                key={card.id}
                id={card.id}
                content={card.content}
                flipped={card.flipped}
                matched={card.matched}
                onClick={handleCardClick}
              />
            ))}
          </div>
         
          <div className="game-controls">
            <button onClick={initializeGame} className="restart-button">
              Restart Game
            </button>
           
            <button onClick={resetGame} className="settings-button">
              Change Settings
            </button>
          </div>
         
          {state.gameOver && (
            <div className="game-over">
              <h3>Congratulations!</h3>
              <p>You completed the game in {state.moves} moves with a score of {state.score}!</p>
             
              {state.loading ? (
                <p>Saving your score...</p>
              ) : (
                <div className="high-scores">
                  <h4>High Scores</h4>
                  <ul>
                    {state.highScores.slice(0, 5).map(score => (
                      <li key={score.id}>
                        {score.score} points - {score.difficulty} difficulty
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default GameBoard;
