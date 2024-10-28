import React, { useState, useEffect } from "react";
import { createCard, updateCard, readCard, readDeck } from "../utils/api";
import { useNavigate, Link, useParams } from "react-router-dom";

function CreateEditCard() {
    // Retrieved deckId from URL parameters to associate the new card correctly.
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState(null);
    
    // Renamed state variables to cardFront and cardBack to match the form inputs.
    const [card, setCard] = useState(null);
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");
    
    const navigate = useNavigate();
     
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        const fetchDeck = async () => {
            try {
                const fetchedDeck = await readDeck(deckId, signal);
                setDeck(fetchedDeck);
                await readCard(cardId, signal);
            } catch (error) {
                console.error("Failed to fetch deck:", error);
            }
        };
        
        fetchDeck();
        
        if (cardId) {
            
        
            
        const fetchCard = async () => {
            try { 
                const fetchedCard = await readCard(cardId, signal);
                setCard(fetchedCard);
            
            } catch (error) {
                console.error("Failed to fetch the card:", error);
            } 
        }
        
        fetchCard();
        
        
        };
        
        
        

        return () => abortController.abort();
    
    }, [deckId]);
    
    

    if (!deck) {
        return <p>Loading...</p>;
    }
    
    if (cardId) {
        //return console.log(card);
        const handleSubmit = async (event) => {
            event.preventDefault();
              
            const updatedCard = {
                id: Number(cardId),
                front: card.front,
                back: card.back,
                deckId: Number(deckId)
            };
            
            try {
                await updateCard(updatedCard);
                console.log(updatedCard);
            } catch (error) {
                console.error("Failed to update card:", error);
            }
            navigate(`/decks/${deckId}`);
        };
    
        function changeHandler({target: {name, value}}) {
            setCard((previousState) => ({
                ...previousState,
                [name]: value, 
            }))
        }
    
        return (
            <div>
                <nav className="breadcrumb">
                    <Link to="/">Home</Link>
                    {` / Deck ${deck.name} / Edit Card`}
                </nav>
    
                <h2>Edit Card</h2>
    
            {/*Updated form fields to use cardFront and cardBack*/}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="front">Front</label>
                        <textarea
                            id="front"
                            name="front"
                            className="form-control"
                            rows="3"
                            value={card.front}
                            onChange={changeHandler}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="back">Back</label>
                        <textarea
                            id="back"
                            name="back"
                            className="form-control"
                            rows="3"
                            value={card.back}
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








    const handleSubmit = async (event) => {
        event.preventDefault();

        const newCard = {
            front: cardFront,
            back: cardBack,
            deckId: Number(deckId)
        };

        try {
            await createCard(deckId, newCard);
            setCardFront("");
            setCardBack("");
        } catch (error) {
            console.error("Failed to create card:", error);
        }
    };

    if (!deck) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <nav className="breadcrumb">
                <Link to="/">Home</Link>
                {` / ${deck.name} / Add Card`}
            </nav>

            <h2>{`${deck.name}: Add Card`}</h2>

        {/*Updated form fields to use cardFront and cardBack*/}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea
                        id="front"
                        className="form-control"
                        rows="3"
                        value={cardFront}
                        onChange={(e) => setCardFront(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea
                        id="back"
                        className="form-control"
                        rows="3"
                        value={cardBack}
                        onChange={(e) => setCardBack(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate(`/decks/${deckId}`)}>
                    Done
                </button>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    );




    
    
    
    
    
    
    
    /*
    
    
    
    if (!cardId) {
    
    // Corrected navigation path after creating a card
    const handleCreateSubmit = async (event) => {
        event.preventDefault();

        const newCard = {
            front: cardFront,
            back: cardBack,
            deckId: Number(deckId)
        };

        try {
            await createCard(deckId, newCard);
            setCardFront("");
            setCardBack("");
        } catch (error) {
            console.error("Failed to create card:", error);
        }
    };

    

    return (
        <div>
            <nav className="breadcrumb">
                <Link to="/">Home</Link>
                {` / ${deck.name} / Add Card`}
            </nav>

            <h2>{`${deck.name}: Add Card`}</h2>

        
            <form onSubmit={handleCreateSubmit}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea
                        id="front"
                        className="form-control"
                        rows="3"
                        value={cardFront}
                        onChange={(e) => setCardFront(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea
                        id="back"
                        className="form-control"
                        rows="3"
                        value={cardBack}
                        onChange={(e) => setCardBack(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate(`/decks/${deckId}`)}>
                    Done
                </button>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    );

};
        const abortController = new AbortController();
        const signal = abortController.signal;
    
    
    const fetchCard = async () => {
        try {
            const fetchedCard = await readCard(cardId, signal);
            setCard(fetchedCard);
            
        } catch (error) {
            console.error("Failed to fetch deck:", error);
        }
    
    };
        fetchCard();



if (!deck || !card) {
    return <p>Loading...</p>;
}
    const handleSubmit = async (event) => {
        event.preventDefault();
          
        const updatedCard = {
            id: Number(cardId),
            front: card.front,
            back: card.back,
            deckId: Number(deckId)
        };
        
        try {
            await updateCard(updatedCard, signal);
            console.log(updatedCard);
        } catch (error) {
            console.error("Failed to update card:", error);
        }
        navigate(`/decks/${deckId}`);
    };

function changeHandler({target: {name, value}}) {
    setCard((previousState) => ({
        ...previousState,
        [name]: value, 
    }))
}

return (
    <div>
        <nav className="breadcrumb">
            <Link to="/">Home</Link>
            {` / Deck ${deck.name} / Edit Card`}
        </nav>

        <h2>Edit Card</h2>

    
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea
                    id="front"
                    name="front"
                    className="form-control"
                    rows="3"
                    value={cardFront}
                    onChange={changeHandler}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea
                    id="back"
                    name="back"
                    className="form-control"
                    rows="3"
                    value={cardBack}
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

*/



}

export default CreateEditCard;