import React from "react";
import { Link, useParams } from "react-router-dom";

import "./AnimalCard.css";

import petProfileIcon from './petProfile.png'
import endedVisitsIcon from './visits.png'
import vaccineIcon from './vaccine.png'
import diseaseIcon from './disease.png'
import treatmentIcon from './treatments.png'
import researchIcon from './research.png'
import weightIcon from './weight.png'

function AnimalCard(){
    const {petId} = useParams();
    return(
        <div style={{height: "100%", width: "100%"}}>
            <Link to="/pets">
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "6em", top: "3.5em"}}>
                    <p>Powrót</p>
                </button>
            </Link>
            <div className="menu animal__card">
                <div className="menu__card menu__animalCard">
                    <img className="menu__icon menu__animalCard__icon" src={petProfileIcon} alt="petProfileIcon"></img>
                    <h1>Profil</h1>
                </div>
                <div className="menu__card menu__animalCard">
                    <img className="menu__icon menu__animalCard__icon" src={endedVisitsIcon} alt="endedVisitsIcon"></img>
                    <h1>Zakończone wizyty</h1>
                </div>
                <div className="menu__card menu__animalCard">
                    <img className="menu__icon menu__animalCard__icon" src={vaccineIcon} alt="vaccineIcon"></img>
                    <h1>Szczepienia</h1>
                </div>
                <div className="menu__card menu__animalCard">
                    <img className="menu__icon menu__animalCard__icon" src={diseaseIcon} alt="diseaseIcon"></img>
                    <h1>Choroby</h1>
                </div>
                <div className="menu__card menu__animalCard">
                    <img className="menu__icon menu__animalCard__icon" src={treatmentIcon} alt="treatmentIcon"></img>
                    <h1>Zabiegi</h1>
                </div>
                <div className="menu__card menu__animalCard">
                    <img className="menu__icon menu__animalCard__icon" src={researchIcon} alt="researchIcon"></img>
                    <h1>Badania</h1>
                </div>
                <div className="menu__card menu__animalCard">
                    <img className="menu__icon menu__animalCard__icon" src={weightIcon} alt="weightIcon"></img>
                    <h1>Waga</h1>
                </div>
            </div>
        </div>
    );
}

export default AnimalCard;