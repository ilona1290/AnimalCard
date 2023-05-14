import React, { useEffect, useState} from "react";
import { getData } from "../../components/Services/AccessAPI";
import SessionManager from "../../components/Auth/SessionManager";
import { useNavigate } from 'react-router-dom';

import "./OwnerProfile.css"
import ProfilePicture from "./owner2.png"
import pet1 from '../PetProfile/goldenRetriever.jpg'

const owner = {
    name: "Właściciel",
    surname: "Testowy",
    email: "wlascicieltestowy@gmail.com",
    phoneNumber: "256354789",
    profilePicture: ProfilePicture
}

function OwnerProfile(){
    let navigate = useNavigate();
    const pets = ["Astro", "Balto", "Barney"];
    // const [owner, setOwner] = useState(null)
    // const [isLoading, setLoading] = useState(true)

    // useEffect(() => {
    //     getData('api/Vet/' + SessionManager.getUserId()).then((result) => {
    //         setOwner(result);
    //         console.log(result)
    //         setLoading(false);
    //     })
    // }, [isLoading])

    const handleClick = (index) => {
        navigate(`/pets/${index}`)
    }

    const handleBack = () => {
        navigate('/ownerMenu')
    }

    return(
        <div className="ownerProfile__container">
            <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "2%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <div className="ownerProfile__card">
                <img className="ownerProfile__img" src={owner.profilePicture} alt="Owner" />
                <div className="ownerProfile__name">{owner.name} {owner.surname}</div>
                <div className="owner__profile__contact">
                    <div className="ownerProfile__label">Email:</div> 
                    <div className="ownerProfile__value">{owner.email}</div>
                </div>
                <div className="ownerprofile__contact">
                    <div className="ownerProfile__label">Nr telefonu:</div>
                    <div className="ownerProfile__value">{owner.phoneNumber}</div>
                </div>
            </div>
            <div className="ownerProfile__pets">
                <h1>Zwierzęta</h1>
                <div className="animals">
                        {pets.map((pet, index) => {
                            return(
                                <div className="menu__card owner__pet" onClick={() => handleClick(index + 1)}>
                                    <img className="ownerProfile__petImg" src={pet1} alt="pet1"></img>
                                    <h1>{pet}</h1>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    )
}

export default OwnerProfile;