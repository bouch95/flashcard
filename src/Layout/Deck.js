import React from "react";
import { deleteDeck } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

function Deck({ deck }) {
    const navigate = useNavigate();
    const abortController = new AbortController();
    const signal = abortController.signal;
    
    let count = 0;
    deck.cards.map(() => (
        count += 1));
    
    return (
        <legend>
        <div className="deck p-4 border">
            <div className="row">
            <h2>{deck.name}</h2>
                <p>{count} Cards</p>
            </div>
            <p>{deck.description}</p>
            
            <div>
                <Link to={`/decks/${deck.id}`}>
                    <button className="btn btn-secondary border" type="button">View</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                    <button className="btn btn-secondary border" type="button">Study</button>
                </Link>
                <Link>
                    <button className="btn btn-secondary border" type="button" onClick={() => 
                        {if (window.confirm("Delete this deck? You will not be able to recover it.")) {
                            deleteDeck(deck.id, signal);
                            navigate("/");
                        } else navigate("/");
                        }
                    }>Delete</button>
                </Link>
            
            </div>
        </div>
        </legend>
    );
}

export default Deck;
