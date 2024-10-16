import React, { useState } from "react";
import { createCard } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function CreateCard() {
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");
    const [deckId, setDeckId] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newCard = {
            front: cardFront,
            back: cardBack,
            deckId: deckId
        };

        try {
            const createdCard = await createCard(deckId, newCard);
            navigate("/decks/deckId/study");
        } catch (error) {
            console.error("Failed to create card:", error);
        }
    };

    return (
        <div>
            <nav className="breadcrumb"><Link to="/">Home </Link>`/ Create Deck</nav>
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="deckName">Name</label>
                    <input
                        id="deckName"
                        type="text"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="deckDescription">Description</label>
                    <textarea
                        id="deckDescription"
                        value={deckDescription}
                        onChange={(e) => setDeckDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="button" onClick={() => {navigate("/")}}>
                    Cancel
                </button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateCard;
