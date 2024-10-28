import React from "react";
import { Routes, Route } from "react-router-dom";
import DeckList from "./DeckList";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck";
//import CreateCard from "./CreateCard"; // Ensure this is imported
import StudyDeckCards from "./StudyDeckCards";
import EditDeck from "./EditDeck";
//import EditCard from "./EditCard";
import DeckDetail from "./DeckDetail";
import CreateEditCard from "./CreateEditCard";
// Included a route for /decks/:deckId/cards/new to handle adding new cards.

function RootRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DeckList />} />
            <Route path="/decks/:deckId/new" element={<CreateDeck />} />
            <Route path="/decks/:deckId" element={<DeckDetail />} />
            <Route path="/decks/:deckId/cards/new" element={<CreateEditCard />} /> {/* Added Route */}
            <Route path="/decks/:deckId/cards/:cardId/edit" element={<CreateEditCard />} />
            <Route path="/decks/:deckId/study" element={<StudyDeckCards />} />
            <Route path="/decks/:deckId/edit" element={<EditDeck />} />
            {/* Add more routes here if needed */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RootRoutes;
