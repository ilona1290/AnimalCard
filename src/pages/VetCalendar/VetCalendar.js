import React from "react";
import { Link } from 'react-router-dom';
import NewVisitDialog from "../../components/NewVisitDialog";

function VetCalendar(){
    return(
        <div style={{height: "100%"}}>
            <NewVisitDialog />
            {/* <Link to="/vetMenu/calendar/startVisit">
                <div className="header__buttons__end__btn" style={{position: "absolute", right: "29em", top: "3.5em", fontSize: "1.6rem", fontFamily: "Arial"}}>Zaplanuj wizytę</div>
            </Link> */}
            <Link to="/vetMenu/calendar/startVisit">
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "15em", top: "3.5em"}}>Rozpocznij wizytę</button>
            </Link>
            <Link to="/vetMenu">
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "6em", top: "3.5em"}}>Powrót</button>
            </Link>
        </div>
    );
}

export default VetCalendar;