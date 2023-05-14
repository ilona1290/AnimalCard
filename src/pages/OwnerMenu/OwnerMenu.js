import React from "react";
import { Link, useNavigate } from 'react-router-dom'

import ownerIcon from './petOwner.svg'
import calendarIcon from './schedule.svg'
import treatedPetIcon from './myPets.svg'

function OwnerMenu() {
    let navigate = useNavigate();

    const goToProfile = () => {
        navigate("/ownerMenu/profile");
    }

    const goToCalendar = () => {
        navigate("/ownerMenu/calendar");
    }

    const goToTreatedPets = () => {
        navigate("/pets")
    }

    return(
        <div className="menu">
            <div className="menu__card" onClick={goToProfile}>
                <img className="menu__icon" src={ownerIcon} alt="vetIcon"></img>
                <h1 className="menu__icon__title">Profil</h1>
            </div>
            <div className="menu__card" onClick={goToCalendar}>
                <img className="menu__icon" src={calendarIcon} alt="calendarIcon"></img>
                <h1 className="menu__icon__title">Kalendarz zaplanowanych wizyt</h1>
            </div>
            <div className="menu__card" onClick={goToTreatedPets}>
                <img className="menu__icon" src={treatedPetIcon} alt="treatedPetIcon"></img>
                <h1 className="menu__icon__title">Moje zwierzęta</h1>
            </div>
        </div>
    );
}

export default OwnerMenu;