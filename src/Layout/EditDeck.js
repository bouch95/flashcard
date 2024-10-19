import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from "../utils/api";
import { useNavigate, Link, useParams } from "react-router-dom";

function EditDeck() {
    // Retrieved deckId from URL parameters to associate the new card correctly.
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
    
    // Corrected navigation path after creating a deck
    const handleSubmit = async (event) => {
        event.preventDefault();
          
        const updatedDeck = {
            id: Number(deckId),
            name: deck.name,
            description: deck.description,
        };
        
        try {
            await updateDeck(updatedDeck);
        } catch (error) {
            console.error("Failed to update deck:", error);
        }
        navigate(`/decks/${deckId}`);
    };

    function changeHandler({target: {name, value}}) {
        setDeck((previousState) => ({
            ...previousState,
            [name]: value, 
        }))
    }

    return (
        <div>
            <nav className="breadcrumb">
                <Link to="/">Home</Link>
                {` / Deck ${deck.name} / Edit Deck`}
            </nav>

            <h2>Edit Deck</h2>

        {/*Updated form fields to use cardFront and cardBack*/}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <textarea
                        id="name"
                        name="name"
                        className="form-control"
                        rows="3"
                        value={deck.name}
                        onChange={changeHandler}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows="3"
                        value={deck.description}
                        onChange={changeHandler}
                        required
                    ></textarea>
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate(`/decks/${deckId}/`)}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EditDeck;
