import React, { useRef, useEffect } from 'react'
import './Card.css'

const Card =  ({ id, content, flipped, matched, onClick}) => {
    const cardRef = useRef (null)

    // Card is flipped
    useEffect ( () => {
        if (flipped) {
            console.log( `Card ${id} with ${content} was flipped `)
        } 
    }, [flipped, id, content])

    // Animation when card is matched
    useEffect ( () => {
        if (matched && cardRef.current) {
            cardRef.current.classList.add('card matched animation')
            return () => {
                if (cardRef.current) {
                    cardRef.current.classList.remove('card matched animation')
                } 
            } 
        } 
    },[matched])

    return (
        <div ref={cardRef} className={ `card ${flipped ? 'flipped' : ''} ${matched ? 'matched' : ''}`} onClick={  () => onClick  (id)}>
            <div className="card-inner">
                <div className="card-back">{content}</div>
            </div>
        </div>   
    )
}  

export default Card