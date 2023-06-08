import React, { useState, useEffect } from "react";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useParams, useNavigate } from 'react-router-dom'
import { getData, postData, putData } from "../../components/Services/AccessAPI";
import "./PetProfile.css"
import Loader from "../../components/Loader/Loader";
import SessionManager from "../../components/Auth/SessionManager";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

function PetProfile(){
    let navigate = useNavigate();
    const {petId} = useParams();
    const [pet, setPet] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingImage, setLoadingImage] = useState(true);

    useEffect(() => {
        getData(`api/Pet/${petId}`).then((result) => {
            result.dateBirth = new Date(result.dateBirth);
            setPet(result);
            setLoading(false);
            setLoadingImage(false)
        })
    }, [])

    const handleBack = () => {
        navigate(`/pets/${petId}`)
    }

    const handleUpdate = () => {
        navigate(`/pets/${petId}/profile/update`)
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
            setPet({...pet, photo: result})
            let resultToSend = {
                who: 'pet',
                id: Number(petId),
                photo: result
            }
            console.log(resultToSend)
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


    return(
        <div style={{width: "100%", padding: "10em 1em 1em 1em", display: "flex", justifyContent: "center"}}>
            {isLoading && <Loader />}
            {!isLoading &&
            <div>
                <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "2rem", top: "3.5em"}}>
                    <p>Powrót</p>
                </button>
                {SessionManager.getRole() === "Vet" && <button className="header__buttons__end__btn" onClick={handleUpdate} style={{position: "absolute", right: "15rem", top: "3.5em"}}>
                    <p>Edytuj profil</p>
                </button>}
                <div className="pet__container">
                    <div className="pet__img__container">
                        {isLoadingImage && <div className="pet__img img__preview petProfile__img" style={{position: "relative"}}><Loader /></div>}
                        {!isLoadingImage && <img className="pet__img img__preview petProfile__img" id="output" src={pet.photo} name="petPhoto" alt="PetProfilePicture"></img>}
                        <label htmlFor="img" className="updateProfile__avatar__btn">Zmień zdjęcie zwierzęcia</label>
                        <input name="Avatar" id = 'img' type="file" style={{visibility:"hidden"}} onChange={(e)=> handleImageChange(e)}/>
                    </div>
                    <div className="pet__form">
                    <div className="pet__firstColumn">
                        <ThemeProvider theme={theme}>
                            <Typography component={'span'} variant={'body2'}>
                                <div className="pet__info__header">Właściciel</div>
                                <div className="pet__form__info">{pet.owner}</div>
                                <div className="pet__info__header">Numer identyfikacyjny</div>
                                <div className="pet__form__info">{pet.identityNumber}</div>
                                <div className="pet__info__header">Imię</div>
                                <div className="pet__form__info">{pet.name}</div>
                                <div className="pet__info__header">Płeć</div>
                                <div className="pet__form__info">{pet.sex}</div>
                                <div className="pet__info__header">Data urodzenia</div>
                                <div className="pet__form__info">{pet.dateBirth.toLocaleDateString()}r.</div>
                                <div className="pet__info__header">Rasa</div>
                                <div className="pet__form__info">{pet.breed}</div>
                                <div className="pet__info__header">Barwa</div>
                                <div className="pet__form__info">{pet.color}</div>
                                <div className="pet__info__header">Rodzaj sierści</div>
                                <div className="pet__form__info">{pet.hairType}</div>
                                </Typography>
                        </ThemeProvider>
                                </div>
                                <div className="pet__secondColumn">
                                    
                                <ThemeProvider theme={theme}>
                                <Typography component={'span'} variant={'body2'}>
                                <div className="pet__info__header">Znaki szczególne</div>
                                <div className="pet__form__info">{pet.trademarks}</div>
                                <div className="pet__info__header">Ewentualne uczulenia</div>
                                <div className="pet__form__info">{pet.allergies}</div>
                                <div className="pet__info__header">Informacje dodatkowe</div>
                                <div className="pet__form__info">{pet.extraInfo}</div>
                            </Typography>
                        </ThemeProvider></div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default PetProfile;