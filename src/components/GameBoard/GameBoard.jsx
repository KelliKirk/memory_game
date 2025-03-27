import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import useGameData from '../../hooks/useGameData';
import Card from '../Card/Card';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import GameSettings from '../GameSettings/GameSettings';
import './GameBoard.css';

const GameBoard = () => {
  const { state, dispatch, actionTypes } = useGameContext();
  const { handleCardClick, initializeGame, resetGame } = useGameData();
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  // Log game activity
  useEffect(() => {
    console.log('Game state updated:', {
      score: state.score,
      moves: state.moves,
      matchedPairs: state.matchedPairs.length,
      totalPairs: state.cardCount / 2
    });
  }, [state.score, state.moves, state.matchedPairs.length, state.cardCount]);

  // Show completion popup when game is complete
  useEffect(() => {
    if (state.gameOver) {
      setShowCompletionPopup(true);
    }
  }, [state.gameOver]);

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

  const handlePlayAgain = () => {
    // First, set gameOver to false to prevent popup from showing
    dispatch({ type: actionTypes.SET_GAME_OVER, payload: false });
    
    // Then initialize the game
    initializeGame();
    
    // Ensure popup is hidden
    setShowCompletionPopup(false);
  };

  const handleBackToSettings = () => {
    // Reset game state and hide popup
    resetGame();
    setShowCompletionPopup(false);
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
          

          {showCompletionPopup && (
            <div className="popup">
              <div className="popup-content">
                <h3 className="popup-title">Well done!</h3>
                <p className="popup-message">All the cards have been matched.</p>
                <div className="popup-stats">
                  <p>Score: {state.score}</p>
                  <p>Moves: {state.moves}</p>
                </div>
                <div className="popup-buttons">
                  <button onClick={handlePlayAgain} className="popup-button primary-button">
                    Play Again
                  </button>
                  <button onClick={handleBackToSettings} className="popup-button secondary-button">
                    Back to Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameBoard;