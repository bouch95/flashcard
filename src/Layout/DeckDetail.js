import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useParams, Link, useNavigate } from "react-router-dom";

function DeckDetail() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
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

    if (!deck) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {deck.name}
                    </li>
                </ol>
            </nav>
            
            
            
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <div>
                <Link to={`/decks/${deck.id}/edit`}>
                    <button type="button">Edit Deck</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                    <button type="button">Study Deck</button>
                </Link>
                <Link to={`/decks/${deck.id}/cards/new`}>
                    <button type="button">Add Cards</button>
                </Link>
            </div>
            {/* Display cards associated with the deck */}
            <h3>Cards</h3>
            {deck.cards.length === 0 ? (
                <p>No cards in this deck.</p>
            ) : (
                <ul>
                    {deck.cards.map((card) => (
                        <li key={card.id}>
                            <p><strong>Front:</strong> {card.front}</p>
                            <p><strong>Back:</strong> {card.back}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DeckDetail;
