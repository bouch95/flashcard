import React from "react";
import { Routes, Route } from "react-router-dom";
import Deck from "./Deck";
import DeckList from "./DeckList";

function RootRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DeckList />} />

        </Routes>
    )
}

export default RootRoutes;

