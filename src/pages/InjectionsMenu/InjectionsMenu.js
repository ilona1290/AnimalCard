import React from "react";
import { useParams, useNavigate } from 'react-router-dom'

import rabiesVaccinationsIcon from './Injection1.png';
import otherVaccinationsIcon from './Injection2.png';

function InjectionsMenu(){
    let navigate = useNavigate();
    const {petId} = useParams();

    const goToInjection1 = () =>{
        navigate(`/pets/${petId}/injections/rabiesVacinations`)
    }

    const goToInjection2 = () => {
        navigate(`/pets/${petId}/injections/otherVacinations`)
    }

    const handleBack = () => {
        navigate(`/pets/${petId}`)
    }
    return(
        <div style={{height: "100%"}}>
            <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "6.5%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <div className="menu">
                <div className="menu__card" onClick={goToInjection1}>
                    <img className="menu__icon" src={rabiesVaccinationsIcon} alt="calendarIcon"></img>
                    <h1>Szczepienia przeciwko wściekliźnie</h1>
                </div>
                <div className="menu__card" style={{marginLeft: "3em"}} onClick={goToInjection2}>
                    <img className="menu__icon" src={otherVaccinationsIcon} alt="treatedPetIcon"></img>
                    <h1>Szczepienia przeciwko innym chorobom zakaźnym</h1>
                </div>
            </div>
        </div>
    )
}

export default InjectionsMenu;