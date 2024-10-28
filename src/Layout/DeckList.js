import React, { useState, useEffect } from "react";
import {listDecks} from "../utils/api";
import Deck from "./Deck";

import { useNavigate } from "react-router-dom";

function DeckList() {
    const [ flashDecks, setFlashDecks ] = useState([]);
    const navigate = useNavigate();

    // Fetch decks on component mount
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchDecks = async () => {
            try {
                const decks = await listDecks(signal);
                setFlashDecks(decks);
            } catch (error) {
                console.error("Failed to fetch decks:", error);
            }
        };

        fetchDecks();
        
        return () => abortController.abort();
    }, []);
    
    // Handler to navigate to the Create Deck page
    const handleCreateDeck = () => {
        navigate("/decks/:deckId/new");
    };

    
    return (
        <div>
            <button className="btn btn-secondary" type="button" onClick={handleCreateDeck}>
                + Create Deck
            </button>
            <div>
            
                {flashDecks.map((deck) => (
                    <section className="m-5" key={deck.id}>
                        <Deck deck={deck} />
                    </section>
                ))}
            </div>

        </div>
    );
}
export default DeckList;
