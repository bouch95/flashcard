import React, { useState, useEffect } from "react";
import {listDecks} from "../utils/api";
//import Deck from "./Deck";

import { Outlet } from "react-router-dom";

function DeckList() {
    const [ flashDecks, setFlashDecks ] = useState([]);
    
    //FETCH decks/cards
       useEffect (() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        listDecks(signal)
            .then(response =>
                response.json())
            .then(data => {
                console.log(JSON.stringify(data));
                setFlashDecks(data);
            })
            .catch((error) => console.error("Failed to fetch decks:", error));

    return () => abortController.abort();    
        }, []);
    
    return (
    
        <div>
            <h1>The Deck</h1>
            <p>{flashDecks.length}</p>
            <ul>
            
        </ul>
        
        <Outlet/>
        </div>
    );
}
export default DeckList;
