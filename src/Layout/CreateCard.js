import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../utils/api";
import { useNavigate, Link, useParams } from "react-router-dom";

function CreateCard() {
    // Retrieved deckId from URL parameters to associate the new card correctly.
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
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
            
        
        return () => abortController.abort();
    }, [deckId]);

    // Corrected navigation path after creating a card
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newCard = {
            front: cardFront,
            back: cardBack,
            deckId: Number(deckId)
        };

        try {
            await createCard(deckId, newCard);
            setCardFront("");
            setCardBack("");
        } catch (error) {
            console.error("Failed to create card:", error);
        }
    };

    if (!deck) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <nav className="breadcrumb">
                <Link to="/">Home</Link>
                {` / ${deck.name} / Add Card`}
            </nav>

            <h2>{`${deck.name}: Add Card`}</h2>

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
                    ></textarea>
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
                    ></textarea>
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate(`/decks/${deckId}`)}>
                    Done
                </button>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    );
}

export default CreateCard;
