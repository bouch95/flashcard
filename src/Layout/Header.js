import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="jumbotron bg-dark">
      <div className="container text-white">
        <h1 className="display-4">
          <Link to="/" className="text-white text-decoration-none">
            Flashcard-o-matic
          </Link>
        </h1>
        <p className="lead">Discover The Flashcard Difference.</p>
      </div>
    </header>
  );
}

export default Header;