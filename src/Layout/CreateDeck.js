import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function CreateDeck() {
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newDeck = {
            name: deckName,
            description: deckDescription,
        };

        try {
            const createdDeck = await createDeck(newDeck);
            navigate("/");
        } catch (error) {
            console.error("Failed to create deck:", error);
        }
    };

    return (
        <div>
            <nav className="breadcrumb"><Link to="/">Home</Link>Create Deck</nav>
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

export default CreateDeck;
