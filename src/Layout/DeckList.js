import React, { useState, useEffect } from "react";
import Data from "../data/db.json";
//import Deck from "./Deck";

import { Outlet } from "react-router-dom";

function DeckList() {
    const [ flashDecks, setFlashDecks ] = useState({});
    
    //FETCH decks/cards
       useEffect (() => {
        fetch("/data/db.json")
            .then(response =>
                response.json())
            .then(data =>
                setFlashDecks(data));
        }, []);
    
    console.log("../data/db.json");
        
    return (
    
        <div>
            <h1>The Deck</h1>
            <ul>
            
        </ul>
        
        <Outlet/>
        </div>
    );
}
export default DeckList;
