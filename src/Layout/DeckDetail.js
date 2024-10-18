import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
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

    if (!deck || !deck.cards) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <nav className="breadcrumb">
                <Link to="/">Home</Link>
                {` / ${deck.name}`}
            </nav>
                        
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <div>
                <Link to={`/decks/${deck.id}/edit`}>
                    <button className="btn btn-primary m-2 border" type="button">Edit Deck</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                    <button className="btn btn-primary m-2 border" type="button">Study Deck</button>
                </Link>
                <Link to={`/decks/${deck.id}/cards/new`}>
                    <button className="btn btn-primary m-2 border" type="button">Add Cards</button>
                </Link>
                <Link>
                    <button className="btn btn-primary m-2 border" type="button" onClick={() => 
                        {if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
                            deleteDeck(deck.id);
                            navigate("/");
                        } else navigate("/");
                        }
                    }>Delete</button>
                </Link>            
            </div>
            {/* Display cards associated with the deck */}
            <h3>Cards</h3>
            {deck.cards.length === 0 ? (
                <p>No cards in this deck.</p>
            ) : (
                <ul>
                    {deck.cards.map((card) => (
                        <div className="border">
                        <div className="row " key={card.id}>
                            <p className="m-4">{card.front}</p>
                            <p className="m-4">{card.back}</p>
                            </div>
                        <div>
                            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                                <button className="btn btn-primary m-2 border" type="button">Edit</button>
                            </Link>
                            <Link>
                                <button className="btn btn-primary m-2 border" type="button" onClick={() => 
                                    {if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
                            deleteCard(card.id);
                            navigate(`/decks/${deck.id}`);
                        } else navigate(`/decks/${deck.id}`);
                        }
                    }>Delete</button>
                </Link>
                            </div>
                        
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DeckDetail;
