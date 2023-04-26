import React from "react";
import { Link, useNavigate } from 'react-router-dom'

import ownerIcon from '../../components/User/userIcon.svg'
import calendarIcon from '../VetMenu/calendar.png'
import treatedPetIcon from '../VetMenu/treatedPet.png'

function OwnerMenu() {
    let navigate = useNavigate();

    const goToProfile = () => {
        // navigate("/vetMenu/profile");
    }

    const goToTreatedPets = () => {
        navigate("/pets")
    }

    return(
        <div style={{height: "100%"}}>
            <Link to="/logout">
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "1em", top: "1em"}}>
                    <p>Wyloguj</p>
                </button>
            </Link>
            <div className="menu">
                    <div className="menu__card" onClick={goToProfile}>
                        <img className="menu__icon" src={ownerIcon} alt="vetIcon"></img>
                        <h1>Profil</h1>
                    </div>
                <div className="menu__card">
                    <img className="menu__icon" src={calendarIcon} alt="calendarIcon"></img>
                    <h1>Kalendarz zaplanowanych wizyt</h1>
                </div>
                <div className="menu__card" onClick={goToTreatedPets}>
                    <img className="menu__icon" src={treatedPetIcon} alt="treatedPetIcon"></img>
                    <h1>Moje zwierzęta</h1>
                </div>
            </div>
        </div>
    );
}

export default OwnerMenu;