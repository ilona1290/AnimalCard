import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import './Pets.css';

import pet1 from './pet1.png';
import SessionManager from "../../components/Auth/SessionManager";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

function Pets(){
    let navigate = useNavigate();
    const [pets, setPets] = useState(["Astro", "Balto", "Barney", "Barry", "Beethoven", "Benji", "Kieł", "Boo", "Boss", "Bruiser", "Chojrak", 
    "Cywil", "Droopy", "Dżok", "Eddie", "Goofy", "Fala", "Happy", "Hooch"]);
    const orginalPets = ["Astro", "Balto", "Barney", "Barry", "Beethoven", "Benji", "Kieł", "Boo", "Boss", "Bruiser", "Chojrak", 
    "Cywil", "Droopy", "Dżok", "Eddie", "Goofy", "Fala", "Happy", "Hooch"];

    const handleChange = (event) => {
        let filteredData = orginalPets.filter((el) => {
            if (event.target.value === '') {
                return el;
            }
            else {
                return el.toLowerCase().includes(event.target.value.toLowerCase())
            }
        })
        setPets(filteredData)
    }

    const handleClick = (index) => {
        navigate(`/pets/${index}`)
    }

    const returnBack = () => {
        if(SessionManager.getRole() === "Vet"){
            return(
                <Link to="/vetMenu">
                    <button className="header__buttons__end__btn" style={{position: "absolute", right: "10em", top: "1em"}}>
                        <p>Powrót</p>
                    </button>
                </Link>
            )
        }
        else{
            return(
                <Link to="/ownerMenu">
                    <button className="header__buttons__end__btn" style={{position: "absolute", right: "10em", top: "1em"}}>
                        <p>Powrót</p>
                    </button>
                </Link>
            );
        }
    }
    return(
        <div style={{height: "100%", width: "100%"}}>
            <Link to="/logout">
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "1em", top: "1em"}}>
                    <p>Wyloguj</p>
                </button>
            </Link>
            {returnBack()}
            <div className="container__animals">
                <ThemeProvider theme={theme}>
                    <Typography component={'span'} variant={'body2'}>
                        <TextField className="searchbox" id="outlined-basic" label="Wpisz imię szukanego pacjenta" variant="outlined" onChange={handleChange}/>
                    </Typography>
                </ThemeProvider>
                <div className="animals">
                    {pets.map((pet, index) => {
                        return(
                            <div className="menu__card animals__card" onClick={() => handleClick(index + 1)}>
                                <img className="icon__circle" src={pet1} alt="pet1"></img>
                                <h1>{pet}</h1>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Pets;