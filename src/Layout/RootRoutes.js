import React from "react";
import { Routes, Route } from "react-router-dom";
import DeckList from "./DeckList";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck";
//import DeckDetail from "./DeckDetail";
import StudyDeckCards from "./StudyDeckCards";
import EditDeck from "./EditDeck";

function RootRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DeckList />} />
            <Route path="/decks/new" element={<CreateDeck />} />
            {/*<Route path="/decks/:deckId" element={<DeckDetail />} />*/}
            <Route path="/decks/:deckId/study" element={<StudyDeckCards />} />
            <Route path="/decks/:deckId/edit" element={<EditDeck />} />
            {/* Add more routes here if needed */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RootRoutes;
