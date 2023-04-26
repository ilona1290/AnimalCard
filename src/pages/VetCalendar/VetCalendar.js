import React from "react";
import { Link } from 'react-router-dom';

function VetCalendar(){
    return(
        <div>
            <Link to="/vetMenu/calendar/startVisit">
                <button className="header__buttons__end__btn">Rozpocznij wizytę</button>
            </Link>
            <Link to="/vetMenu">
                <button className="header__buttons__end__btn">Powrót</button>
            </Link>
            <Link to="/logout">
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "1em"}}>
                    <p>Wyloguj</p>
                </button>
            </Link>
        </div>
    );
}

export default VetCalendar;