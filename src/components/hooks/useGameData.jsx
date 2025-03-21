import { useEffect } from 'react'
import { useGameContext } from '../contexts/GameContext'  
import { fetchGameAnimals } from '../services/api'

// Difficulty settings
const difficultySettings = {
    easy: { matchTime: 1000, scoreMultiplier: 1 },
    medium: { matchTime: 800, scoreMultiplier: 2 },
    hard: { matchTime: 600, scoreMultiplier: 3 },   
} 

const useGameData = () => {
    const { state, dispatch, actionTypes } = useGameContext
    
    // Initialize game with cards
    const initializeGame = async () => {
        try {
            const animals = await fetchGameAnimals

            // Select animals based on card count
            const pairCount = state.cardCount / 2

            // Shuffle and select animals
            const shuffledAnimals = [...animals].sort (() => Math.random() - 0.5)
            const selectedAnimals = shuffledAnimals.slice(0, pairCount) 

            // Create pairs and shuffle

            const cardPairs = [...selectedAnimals, ...selectedAnimals]
            const shuffledCards = cardPairs
            .sort(() => Math.random() - 0.5)
            .map((animal, index) => ({
                id: index,
                content: animal,
                flipped: false,
                matched: false
            } ))
            
            dispatch( { type: actionTypes.INITIALIZE_GAME, payload: shuffledCards} )
        } catch (error) {
            console.error("Failed to initialize game:", error)
        } 
    } 

    // Handle card click
    const handleCardClick = (cardId) => {
        // Prevent clicking if two cards are already flipped or matched
        if (state.flippedCards.length === 2 || state.cards.find(card => card.id === cardId).matched || state.flippedCards.includes(cardId)) {
            return
        } 

        // Flip the card
        dispatch ( {type: actionTypes.FLIP_CARD, payload: { cardId } } )

        // Check for matches if two cards are flipped 
        if (state.flippedCards.length === 1) {
            dispatch({ type: actionTypes.INCREMENT_MOVES})

            const firstCardId = state.flippedCards[0]
            const secondCardId = cardId
            const firstCard = state.cards.find(card => card.id === firstCardId) 
            const secondCard = state.cards.find(card => card.id === secondCardId)

            if (firstCard.content === secondCard.content){
                // Cards match
                const baseScore = 100
                const multiplier = difficultySettings[state.difficulty].scoreMultiplier
                
                dispatch({
                    type: actionTypes.MATCH_CARDS,
                    payload: {
                        firstCardId,
                        secondCardId,
                        content: firstCard.content,
                        scoreToAdd: baseScore * multiplier
                    } 
                } )

                // Check if game is over

                if (state.matchedPairs.length + 1 === state.cardCount / 2) {
                    dispatch({ type: actionTypes.SET_GAME_OVER} )
                } else {
                    // Cards don't match, flip them back after a delay
                    setTimeout(() => {
                        dispatch({
                            type: actionTypes.RESET_FLIPPED,
                            payload: { firstCardId, secondCardId } 
                        } )
                    }, difficultySettings[state.difficulty].matchTime)
                } 
            } 
        } 
        // Handle difficulty change
        const handleDifficultyChange = (e) => {
            dispatch({type: actionTypes.CHANGE_DIFFICULTY, payload: e.target.value})
        } 

        // Handle card count change
        const handleCardCountChange = (e) => [
            dispatch({type: actionTypes.CHANGE_CARD_COUNT, payload: parseInt(e.target.value) })
        ] 

        // Reset game
        const resetGame = () => {
            dispatch({ type: actionTypes.RESET_GAME})
        } 

        return {
            difficultySettings,
            initializeGame,
        handleCardClick,
    handleDifficultyChange,
handleCardCountChange,
resetGame        } 
    } 
} 

export default useGameData