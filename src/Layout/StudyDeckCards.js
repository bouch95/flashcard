import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useNavigate, Link, useParams } from "react-router-dom";


function StudyDeckCards() {
    
    // Extracting deckId from URL parameters
    const { deckId } = useParams();
    const [ selectedDeck, setSelectedDeck ] = useState(null);
        
    // Fetch decks on component mount
    useEffect(() => {
        // Creating an AbortController to cancel fetch requests if component unmounts
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
        
        console.log("where's the hook");
        console.log(deckId);
        console.log(selectedDeck);
        
        // Cleanup function to abort fetch on component unmount
        return () => abortController.abort();
    }, [deckId]); // Effect runs everytime 'deckId' changes    
    
    if (!selectedDeck) {
        return <p>Loading...</p>;
    }
    
    console.log(selectedDeck);
    
    // If the deck has fewer than 2 cards, prompt the user to add more
    //if (!selectedDeck || selectedDeck.cards.length < 2) {
    return (
        <div>
            {/* Breadcrumb navigation */}
            <nav className="breadcrumb">
                <Link to="/">Home</Link>
                {` / ${selectedDeck.name} / Study`}
            </nav>

            {/* Deck name as heading */}
            <h2>{`${selectedDeck.name}: Study`}</h2>
            
            {/* Informative message about insufficient cards */}
            <div className="deck p-4 border">
                <h3>Not enough cards.</h3>
                <p>You need to have at least 3 cards to study.</p>
                <p>{`There are ${selectedDeck} cards in this deck.`}</p>
            
                {/* Button to navigate to add new cards */}
                <Link to={`/decks/${deckId}/cards/new`}>
                    <button type="button" className="btn btn-secondary border">
                        Add Cards
                    </button>
                </Link>
            </div>
        </div>
    );
/*
    let side = "front";
    return (
        <div>
            
            <nav className="breadcrumb"><Link to="/">Home</Link>{` / ${selectedDeck.name} / Study`}</nav>
            <h2>{`${selectedDeck.name}: Study`}</h2>
            
                {selectedDeck.cards.map((card) => (
                    <div className="deck p-4 border">
                    <h3>{`Card ${card} of ${selectedDeck.cards.length}`}</h3>
                    <p>{card.side}</p>
                    <button type="button" className="btn btn-secondary border" onClick={() => 
                        {if (side === "front") {
                            side = "back";
                        } else {
                            side = "front";
                        }
                }}>
                        Flip
                    </button>    
                    </div>
                ))}
           


            <p>This is a placeholder for the component.</p>
            <p></p>
           
        </div>
    );
*/
    }

export default StudyDeckCards;
