import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import './VetMenu.css';
import vetIcon from '../../components/User/vetIcon.svg';
import calendarIcon from './calendar.png';
import treatedPetIcon from './treatedPet.png';
import animalCardIcon from './animalCard.png'

function VetMenu(){
    let navigate = useNavigate();

    const goToProfile = () => {
        navigate("/vetMenu/profile");
    }

    const goToTreatedPets = () => {
        navigate("/pets")
    }

    const goToCalendar = () => {
        navigate("/vetMenu/calendar")
    }
    return(
        <div style={{height: "100%"}}>
            <div className="menu">
                {/* Link z biblioteki formatuje nam po swojemu klikalną kartę (element div).  Lepiej tu użyć onClicków i useNavigate*/}
                {/* <Link to="/vetMenu/profile"> */}
                    <div className="menu__card" onClick={goToProfile}>
                        <img className="menu__icon" src={vetIcon} alt="vetIcon"></img>
                        <h1>Profil</h1>
                    </div>
                {/* </Link> */}
                <div className="menu__card" onClick={goToCalendar}>
                    <img className="menu__icon" src={calendarIcon} alt="calendarIcon"></img>
                    <h1>Kalendarz zaplanowanych wizyt</h1>
                </div>
                <div className="menu__card" onClick={goToTreatedPets}>
                    <img className="menu__icon" src={treatedPetIcon} alt="treatedPetIcon"></img>
                    <h1>Leczone zwierzęta</h1>
                </div>
                {/* <div className="menu__card" onClick={goToProfile}> */}
                <div className="menu__card">
                    <img className="menu__icon" src={animalCardIcon} alt="animalCardIcon"></img>
                    <h1>Załóż książeczkę</h1>
                </div>
            </div>
        </div>
    );
}

export default VetMenu;