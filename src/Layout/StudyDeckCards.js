import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useNavigate, Link, useParams } from "react-router-dom";


function StudyDeckCards() {
    
    // Extracting deckId from URL parameters
    const { deckId } = useParams();
    const [selectedDeck, setSelectedDeck] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);   
    const [isFlipped, setIsFlipped] = useState(false); 
    const navigate = useNavigate();
    
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
        
              
        // Cleanup function to abort fetch on component unmount
        return () => abortController.abort();
    }, [deckId]); // Effect runs everytime 'deckId' changes    
    
    if (!selectedDeck || !selectedDeck.cards) {
        return <p>Loading...</p>;
    }

    const { cards } = selectedDeck;
    
    //console.log(selectedDeck);
    
    // If the deck has at least 3 cards, prompt the user to add more
    if (cards.length < 3) {
        console.log("number of cards = ", cards.length);
    
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
                <p>{`There are ${cards.length} cards in this deck.`}</p>
            
                {/* Button to navigate to add new cards */}
                <hr />
                    <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                        Add Cards
                    </Link>

            </div>
        </div>
    );
    }
    const currentCard = cards[currentCardIndex];

    // Flip handler
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (currentCardIndex + 1 < cards.length) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(true);
        } else {
            const restart = window.confirm(
                "Restart cards?\n\nClick 'cancel' to return to the home page."
            );
            if (restart) {
                setCurrentCardIndex(0);
                setIsFlipped(false);
            } else {
                navigate("/");
            }
        }
    };

    return (
        <div>
            <nav className="breadcrumb">
                <Link to="/">Home</Link>
                {` / ${selectedDeck.name} / Study`}
            </nav>

            <h2>{`${selectedDeck.name}: Study`}</h2>

           {/*Updated return statement with conditional rendering*/}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        Card {currentCardIndex + 1} of {cards.length}
                    </h5>
                    <p className="card-text">
                        {isFlipped ? currentCard.back : currentCard.front}
                    </p>
                    <button className="btn btn-secondary mr-2" onClick={handleFlip}>
                        Flip
                    </button>
                    {isFlipped ? 
                        
                        <button className="btn btn-primary" onClick={handleNext}>
                            Next
                        </button>
                    : isFlipped}
                </div>
            </div>
        </div>
    );
}
   
export default StudyDeckCards;
