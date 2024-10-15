import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useNavigate, NavLink, Link, useParams } from "react-router-dom";
import TestStudy from "./TestStudy";

function StudyDeckCards() {
    const { deckId } = useParams();
    const [ selectedDeck, setSelectedDeck ] = useState([]);
    //const navigate = useNavigate();
    //console.log(deckId);
    // Fetch decks on component mount
    
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchDecks = async () => {
            try {
                const deck = await readDeck(deckId, signal);
                setSelectedDeck(deck);
                
            } catch (error) {
                console.error("Failed to fetch decks:", error);
            }
        };

        fetchDecks();

        return () => abortController.abort();
    }, []);
    
    //const { cards } = selectedDeck;
    //cards[1].front

    return (
        <div>
            
            <nav className="breadcrumb"><Link to="/">Home</Link>{` / ${selectedDeck.name} / Study`}</nav>
            <h2>{`Study: ${selectedDeck.cards[1].front}`}</h2>
                 
            <p>This is a placeholder for the component.</p>
            <p></p>
           
        </div>
    );
}

export default StudyDeckCards;
