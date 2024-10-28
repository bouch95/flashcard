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
            <nav className="breadcrumb"><Link to="/">Home </Link>/ Create Deck</nav>
            <h2>Create Deck</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="deckName">Name</label>
                    <textarea
                        id="deckName"
                        className="form-control"
                        rows="3"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="deckDescription">Description</label>
                    <textarea
                        id="deckDescription"
                        className="form-control"
                        rows="3"
                        value={deckDescription}
                        onChange={(e) => setDeckDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button className="btn btn-primary" type="button" onClick={() => {navigate("/")}}>
                    Cancel
                </button>
                <button className="btn btn-primary m-4" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateDeck;
