import React from "react";
import { useNavigate } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { postData } from "../../components/Services/AccessAPI";
import SessionManager from "../../components/Auth/SessionManager";

import "./PreviewPetProfile.css";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

function PreviewPetProfile({handleShowPreview, pet, owners, formPhoto}){
    let navigate = useNavigate();
    let dateToShow = pet.dateBirth.$d.toLocaleDateString()
    
    const addImage = (formPhoto, e) => {
        if(formPhoto === null){
            postData('api/Pet/AddPet', pet).then((result) => {
                e.target.classList.remove('animate');
                if(result === 1){
                    e.target.classList.add('success');
                    setTimeout(function(){
                        navigate("/vetMenu");
                      },500);
                    
                }
            })
        }
        else{
            fetch('https://localhost:7099/api/upload/petsphotos',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + SessionManager.getToken()
                    },
                    body: formPhoto
                }
            ).then(function(response) {
                return response.json();
            }).then(function(result) {
                pet.photo = result;
                postData('api/Pet/AddPet', pet).then((result) => {
                    e.target.classList.remove('animate');
                    if(result === 1){
                        e.target.classList.add('success');
                        setTimeout(function(){
                            navigate("/vetMenu");
                          },500);
                    }
                })
            })
        }
    }
    const animateButton = (e) => {
        e.target.innerText = ""
        e.preventDefault();
        //reset animation
        e.target.classList.remove('animate');
        e.target.classList.remove('success');
        
        e.target.classList.add("circle")
        e.target.classList.add('animate');

        let ownerId = owners.find(x => x.fullName === pet.owner).id;
        pet.owner = ownerId;
        
        // pet.dateBirth = new Date(pet.dateBirth)
        addImage(formPhoto, e)
      };
    return(
        <div><div style={{width: "100%", padding: "10em 1em 1em 1em", display: "flex"}}>
            
            <button className="header__buttons__end__btn" id="backPreview" style={{position: "absolute", right: "2em", top: "3.5em"}} onClick={handleShowPreview}>
                <p>Chcę jeszcze coś zmienić</p>
            </button>
            <div className="pet__container">
            <div className="pet__img__container">
                <img className="pet__img img__preview" id="output" src={pet.photo} alt="PetProfilePicture"></img>
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
                        <div className="pet__form__info">{dateToShow}r.</div>
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
        </div>
        <button className="header__buttons__end__btn save__btn" onClick={animateButton}>
                Zapisz
            </button>
        </div>
    )
}

export default PreviewPetProfile;