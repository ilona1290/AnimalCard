import React, { useEffect, useState} from "react";
import { getData, putData } from "../../components/Services/AccessAPI";
import SessionManager from "../../components/Auth/SessionManager";
import { useNavigate } from 'react-router-dom';

import "./OwnerProfile.css"
import ProfilePicture from "./owner2.png"
import Loader from "../../components/Loader/Loader";
import ChangeContactData from "../../components/ChangeContactData/ChangeContactData";

const owner = {
    name: "Właściciel",
    surname: "Testowy",
    email: "wlascicieltestowy@gmail.com",
    phoneNumber: "256354789",
    profilePicture: ProfilePicture
}

function OwnerProfile(){
    let navigate = useNavigate();
    const[owner, setOwner] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingImage, setLoadingImage] = useState(true);
    const [showEditContactForm, setShowEditContactForm] = useState(false)
    const [contactData, setContactData] = useState({})
    // const [owner, setOwner] = useState(null)
    // const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getData(`api/Owner/${SessionManager.getUserId()}`).then((result) => {
            setOwner(result);
            setContactData({
                email: result.email,
                phoneNumber: result.phoneNumber
            })
            setLoading(false);
            setLoadingImage(false)
        })
    }, [])

    const handleClick = (index) => {
        navigate(`/pets/${index}`)
    }

    const handleBack = () => {
        navigate('/ownerMenu')
    }

    const addImage = (form) => {
        fetch('https://animalcardapi.somee.com/api/upload/petsphotos',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + SessionManager.getToken()
                },
                body: form
            }
        ).then(function(response) {
            return response.json();
        }).then(function(result) {
            setOwner({...owner, profilePicture: result})
            SessionManager.updateProfilePicture(result);
            let resultToSend = {
                who: 'owner',
                id: Number(SessionManager.getUserId()),
                photo: result
            }
            putData('api/Photo/UpdatePhoto', resultToSend).then((result) => {
                if(result === true){
                    setLoadingImage(false)
                }
            })
        })
    }
    
    const handleImageChange = (e) => {
        setLoadingImage(true)
        e.preventDefault();
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('image', element);
        }
        form.append('fileName', "Img");
        addImage(form);
    };

    const handleChangeDataContact = () => {
        setShowEditContactForm(!showEditContactForm)
    }

    return(
        <div>
            {isLoading && <Loader />}
            {!isLoading &&
            <div className="ownerProfile__container">
                <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "2%", top: "3.5em"}}>
                    <p>Powrót</p>
                </button>
                <div className="ownerProfile__card">
                    <br></br>
                    {isLoadingImage && <div className="ownerProfile__img" style={{position: "relative", marginLeft: "1em"}}><Loader /></div>}
                    {!isLoadingImage && <img className="ownerProfile__img" src={owner.profilePicture} alt="Owner" />}<br></br><br></br>
                    <label htmlFor="img" className="updateProfile__avatar__btn">Zmień zdjęcie profilowe</label><br></br>
                    <input name="Avatar" id = 'img' type="file" style={{visibility:"hidden"}} onChange={(e)=> handleImageChange(e)}/>
                    <div className="ownerProfile__name">{owner.name} {owner.surname}</div>
                    {SessionManager.getRole() === "User" && Number(SessionManager.getUserId()) === owner.id && <button className="btn__link" onClick={handleChangeDataContact}>
                        {showEditContactForm === false ? "Zmień dane kontaktowe" : "Wyjdź z edycji"}</button>}
                    {showEditContactForm === false ?
                        <div>
                            <div className="owner__profile__contact">
                                <div className="ownerProfile__label">Email:</div> 
                                <div className="ownerProfile__value">{owner.email}</div>
                            </div>
                            <div className="ownerprofile__contact">
                                <div className="ownerProfile__label">Nr telefonu:</div>
                                <div className="ownerProfile__value">{owner.phoneNumber}</div>
                            </div>
                        </div>
                        :
                        <ChangeContactData contactData={contactData}/>
                    }
                </div>
                <div className="ownerProfile__pets">
                    <h1>Zwierzęta</h1>
                    <div className="animals">
                            {owner.pets.userPets.map((pet, index) => {
                                return(
                                    <div className="menu__card owner__pet" onClick={() => handleClick(pet.id)}>
                                        <img className="ownerProfile__petImg" src={pet.photo} alt="pet1"></img>
                                        <h1>{pet.name}</h1>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default OwnerProfile;