import React from "react";
import { useParams, useNavigate } from 'react-router-dom'

import rabiesVaccinationsIcon from './Injection1.png';
import otherVaccinationsIcon from './Injection2.png';

import "./InjectionsMenu.css"

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
            <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "2%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <div className="menu injectionMenu">
                <div className="menu__card menu__injectionCard" onClick={goToInjection1}>
                    <img className="menu__icon injection__icon" src={rabiesVaccinationsIcon} alt="calendarIcon"></img>
                    <h1>Szczepienia przeciwko wściekliźnie</h1>
                </div>
                <div className="menu__card menu__injectionCard" onClick={goToInjection2}>
                    <img className="menu__icon injection__icon" src={otherVaccinationsIcon} alt="treatedPetIcon"></img>
                    <h1>Szczepienia przeciwko innym chorobom zakaźnym</h1>
                </div>
            </div>
        </div>
    )
}

export default InjectionsMenu;