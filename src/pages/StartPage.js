import React from "react";

import { Link } from 'react-router-dom';

function StartPage() {
    return(
        <div className="header">
            <h1 className="header__heading">Witaj w aplikacji Animal Card</h1>
            <div className="header__buttons">
                <Link to="/logout">
                    <button className="header__buttons__btn">
                        <p>Wyloguj</p>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default StartPage;