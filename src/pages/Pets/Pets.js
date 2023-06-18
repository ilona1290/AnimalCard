import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { getData } from "../../components/Services/AccessAPI";

import './Pets.css';

import SessionManager from "../../components/Auth/SessionManager";
import Loader from "../../components/Loader/Loader";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

function Pets(){
    let navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [orginalPets, setOrginalPets] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getData(`api/Pet/GetPetsByUserRole/${SessionManager.getRole()}/${SessionManager.getUserId()}`).then((result) => {
            const petsIds = result.userPets.map(obj => {
                const id  = obj.id;
                return id;
              })
            SessionManager.updatePets(petsIds)
            setPets(result.userPets);
            setOrginalPets(result.userPets);
            setLoading(false);
        })
    }, [])

    const handleChange = (event) => {
        let filteredData = orginalPets.filter((el) => {
            if (event.target.value === '') {
                return el;
            }
            else {
                return el.name.toLowerCase().includes(event.target.value.toLowerCase())
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
                    <button className="header__buttons__end__btn" style={{position: "absolute", right: "2%", top: "3.5em"}}>
                        <p>Powrót</p>
                    </button>
                </Link>
            )
        }
        else{
            return(
                <Link to="/ownerMenu">
                    <button className="header__buttons__end__btn" style={{position: "absolute", right: "2%", top: "3.5em"}}>
                        <p>Powrót</p>
                    </button>
                </Link>
            );
        }
    }
    return(
        <div style={{height: "100%", width: "100%"}}>
            {isLoading && <Loader />}
            {!isLoading && <div>
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
                                <div className="menu__card animals__card" onClick={() => handleClick(pet.id)}>
                                    <img className="icon__circle" src={pet.photo} alt="pet1"></img>
                                    <h1>{pet.name}</h1>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Pets;