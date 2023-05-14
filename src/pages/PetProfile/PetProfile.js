import React from "react";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useParams, useNavigate } from 'react-router-dom'
import PetPhoto from "./goldenRetriever.jpg"
import "./PetProfile.css"

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

  const pet = {
    id: 23413,
    name: "Reksio",
    sex: "Samiec",
    petPhoto: PetPhoto,
    dateBirth: "30.11.2018",
    breed: "Golden Retriever",
    color: "Jasna",
    hairType: "Krótka",
    trademarks: "Mięsisty korpus, krótkie, proste futro, spiczasty pysk, uśmiechnięta twarz, duże uszy i miłe usposobienie",
    allergies: "Brak",
    extraInfo: "Przyjacielski, inteligentny i łagodny pies, który jest łatwy w wychowaniu i uwielbia spędzać czas z ludźmi. Dobrze sprawdza się jako pies przewodnik dla osób niewidomych czy pies ratowniczy."
  }

function PetProfile(){
    let navigate = useNavigate();
    const {petId} = useParams();

    const handleBack = () => {
        navigate(`/pets/${petId}`)
    }
    return(
        <div style={{width: "100%", paddingTop: "10em", display: "flex"}}>
            <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "2%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <div className="pet__container">
                <div className="pet__img__container">
                    <img className="pet__img img__preview petProfile__img" id="output" src={pet.petPhoto} name="petPhoto" alt="PetProfilePicture"></img>
                </div>
                <div className="pet__form">
                <div className="pet__firstColumn">
                    <ThemeProvider theme={theme}>
                        <Typography component={'span'} variant={'body2'}>
                            <div className="pet__info__header">Numer indentyfikacyjny</div>
                            <div className="pet__form__info">{pet.id}</div>
                            <div className="pet__info__header">Imię</div>
                            <div className="pet__form__info">{pet.name}</div>
                            <div className="pet__info__header">Płeć</div>
                            <div className="pet__form__info">{pet.sex}</div>
                            <div className="pet__info__header">Data urodzenia</div>
                            <div className="pet__form__info">{pet.dateBirth}</div>
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
    )
}

export default PetProfile;