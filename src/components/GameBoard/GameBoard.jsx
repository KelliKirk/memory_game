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
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (state.matchedPairs.length === state.cardCount / 2) {
      setShowPopup(true);
    }
  }, [state.matchedPairs.length, state.cardCount]);

  const handlePlayAgain = () => {
    setShowPopup(false);
    initializeGame();
  };

  const handleBackToSettings = () => {
    setShowPopup(false);
    resetGame();
  };

  return (
    <div className="game-board">
      {!state.gameStarted ? (
        <GameSettings />
      ) : (
        <div className="game-content">
          <ScoreBoard />

          <div className={`cards-grid grid-cols-${Math.sqrt(state.cardCount)}` }>
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

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h3>Well Done! All pairs matched 🎉</h3>
                <button onClick={handlePlayAgain} className="popup-button">Play Again</button>
                <button onClick={handleBackToSettings} className="popup-button">Back to Settings</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
