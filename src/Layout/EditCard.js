import React, { useState, useEffect } from "react";
import { readCard, readDeck, updateCard } from "../utils/api";
import { useNavigate, Link, useParams } from "react-router-dom";

function EditCard() {
    // Retrieved deckId from URL parameters to associate the new card correctly.
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState(null);
    // Renamed state variables to cardFront and cardBack to match the form inputs.
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchDeck = async () => {
            try {
                const fetchedDeck = await readDeck(deckId, signal);
                setDeck(fetchedDeck);
            } catch (error) {
                console.error("Failed to fetch deck:", error);
            }
        };

        fetchDeck();

        const fetchCard = async () => {
            try { 
                const fetchedCard = await readCard(cardId, signal);
                setCard(fetchedCard);
            } catch (error) {
                console.error("Failed to fetch the card:", error);

            } 
        ;}
        
        fetchCard();
        
        return () => abortController.abort();
    }, [deckId, cardId]);


    if (!deck || !card) {
        return <p>Loading...</p>;
    }

    // Corrected navigation path after creating a card
    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedCard = {
            front: cardFront,
            back: cardBack,
            deckId: Number(deckId)
        };

        try {
            await updateCard(updatedCard);
            setCardFront("");
            setCardBack("");
        } catch (error) {
            console.error("Failed to update card:", error);
        }
    };

    
    

    return (
        <div>
            <nav className="breadcrumb">
                <Link to="/">Home</Link>
                {` / Deck ${deck.name} / Edit Card`}
            </nav>

            <h2>Edit Card</h2>

        {/*Updated form fields to use cardFront and cardBack*/}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea
                        id="front"
                        className="form-control"
                        rows="3"
                        value={cardFront}
                        onChange={(e) => setCardFront(e.target.value)}
                        required
                    >test</textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea
                        id="back"
                        className="form-control"
                        rows="3"
                        value={cardBack}
                        onChange={(e) => setCardBack(e.target.value)}
                        required
                        placeholder={card.back}
                    ></textarea>
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate(`/decks/${deckId}/`)}>
                    Cacel
                </button>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}


export default EditCard;