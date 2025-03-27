import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { fetchHighScores, saveScore } from '../services/api';

// Initial state
const initialState = {
  cards: [],
  flippedCards: [],
  matchedPairs: [],
  score: 0,
  moves: 0,
  gameStarted: false,
  difficulty: 'medium',
  cardCount: 16,
  gameOver: false,
  highScores: [],
  loading: false,
  error: null
};

// Action types
const actionTypes = {
  INITIALIZE_GAME: 'INITIALIZE_GAME',
  FLIP_CARD: 'FLIP_CARD',
  MATCH_CARDS: 'MATCH_CARDS',
  RESET_FLIPPED: 'RESET_FLIPPED',
  RESET_FLIPPED_WITH_PENALTY: 'RESET_FLIPPED_WITH_PENALTY',
  INCREMENT_MOVES: 'INCREMENT_MOVES',
  SET_GAME_OVER: 'SET_GAME_OVER',
  CHANGE_DIFFICULTY: 'CHANGE_DIFFICULTY',
  CHANGE_CARD_COUNT: 'CHANGE_CARD_COUNT',
  RESET_GAME: 'RESET_GAME',
  SET_HIGH_SCORES: 'SET_HIGH_SCORES',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Reducer function
const gameReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_GAME:
      return {
        ...state,
        cards: action.payload,
        flippedCards: [],
        matchedPairs: [],
        score: 0,
        moves: 0,
        gameOver: false,
        gameStarted: true
      };
    case actionTypes.FLIP_CARD:
      return {
        ...state,
        flippedCards: [...state.flippedCards, action.payload.cardId],
        cards: state.cards.map(card =>
          card.id === action.payload.cardId ? { ...card, flipped: true } : card
        )
      };
    case actionTypes.MATCH_CARDS:
      return {
        ...state,
        matchedPairs: [...state.matchedPairs, action.payload.content],
        score: state.score + action.payload.scoreToAdd,
        cards: state.cards.map(card =>
          (card.id === action.payload.firstCardId || card.id === action.payload.secondCardId)
            ? { ...card, matched: true, flipped: true }
            : card
        ),
        flippedCards: []
      };
    case actionTypes.RESET_FLIPPED:
      return {
        ...state,
        cards: state.cards.map(card =>
          (card.id === action.payload.firstCardId || card.id === action.payload.secondCardId) && !card.matched
            ? { ...card, flipped: false }
            : card
        ),
        flippedCards: []
      };
    case actionTypes.RESET_FLIPPED_WITH_PENALTY:
      return {
        ...state,
        score: Math.max(0, state.score - action.payload.penalty),
        cards: state.cards.map(card =>
          (card.id === action.payload.firstCardId || card.id === action.payload.secondCardId) && !card.matched
            ? { ...card, flipped: false }
            : card
        ),
        flippedCards: []
      };
    case actionTypes.INCREMENT_MOVES:
      return {
        ...state,
        moves: state.moves + 1
      };
    case actionTypes.SET_GAME_OVER:
      return {
        ...state,
        gameOver: true
      };
    case actionTypes.CHANGE_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload
      };
    case actionTypes.CHANGE_CARD_COUNT:
      return {
        ...state,
        cardCount: action.payload
      };
    case actionTypes.RESET_GAME:
      return {
        ...state,
        gameStarted: false
      };
    case actionTypes.SET_HIGH_SCORES:
      return {
        ...state,
        highScores: action.payload,
        loading: false
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

// Create Context
const GameContext = createContext();

// GameProvider Component
const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Fetch high scores when the provider mounts
  useEffect(() => {
    const loadHighScores = async () => {
      try {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        const scores = await fetchHighScores();
        dispatch({ type: actionTypes.SET_HIGH_SCORES, payload: scores });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      }
    };

    loadHighScores();
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch, actionTypes }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom Hook to use Game Context
const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export { gameReducer, actionTypes, GameProvider, useGameContext };