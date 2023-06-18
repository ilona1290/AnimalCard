import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { getData } from "../../components/Services/AccessAPI";

import SessionManager from "../../components/Auth/SessionManager";
import Loader from "../../components/Loader/Loader";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

function Vets(){
    let navigate = useNavigate();
    const [vets, setVets] = useState([]);
    const [orginalVets, setOrginalVets] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getData(`api/Vet/GetAllVets`).then((result) => {
            console.log(result)
            setVets(result.vetsList);
            setOrginalVets(result.vetsList);
            setLoading(false);
        })
    }, [])

    const handleChangeNameSurname = (event) => {
        let filteredData = orginalVets.filter((el) => {
            if (event.target.value === '') {
                return el;
            }
            else {
                return el.vet.toLowerCase().includes(event.target.value.toLowerCase())
            }
        })
        setVets(filteredData)
    }

    const handleChangeCityDistrict = (event) => {
        let filteredData = orginalVets.filter((el) => {
            if (event.target.value === '') {
                return el;
            }
            else {
                return el.vetsCitiesDistricts.toLowerCase().includes(event.target.value.toLowerCase())
            }
        })
        setVets(filteredData)
    }

    const handleChangeDiseases = (event) => {
        let filteredData = orginalVets.filter((el) => {
            if (event.target.value === '') {
                return el;
            }
            else {
                return el.vetDiseases.toLowerCase().includes(event.target.value.toLowerCase())
            }
        })
        setVets(filteredData)
    }

    const handleChangeServicesTreatments = (event) => {
        let filteredData = orginalVets.filter((el) => {
            if (event.target.value === '') {
                return el;
            }
            else {
                return el.vetServicesTreatments.toLowerCase().includes(event.target.value.toLowerCase())
            }
        })
        setVets(filteredData)
    }

    const handleClick = (index) => {
        navigate(`/ownerMenu/vets/${index}`)
    }

    const returnBack = () => {
        return(
            <Link to="/ownerMenu">
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "2%", top: "3.5em"}}>
                    <p>Powrót</p>
                </button>
            </Link>
        );
    }
    return(
        <div style={{height: "100%", width: "100%"}}>
            {isLoading && <Loader />}
            {!isLoading && <div>
                {returnBack()}
                <div className="container__animals">
                    <ThemeProvider theme={theme}>
                        <Typography component={'span'} variant={'body2'}>
                            <div style={{border: "1px solid black", margin: "2em"}}>
                                <h3>Filtry wyszukiwania</h3>
                                <TextField className="searchbox" style={{margin: "1em"}} id="outlined-basic" label="Imię lub nazwisko szukanego weterynarza" variant="outlined" onChange={handleChangeNameSurname}/>
                                <TextField className="searchbox" style={{margin: "1em"}} id="outlined-basic" label="Miasto lub dzielnica" variant="outlined" onChange={handleChangeCityDistrict}/>
                                <TextField className="searchbox" style={{margin: "1em"}} id="outlined-basic" label="Choroba" variant="outlined" onChange={handleChangeDiseases}/>
                                <TextField className="searchbox" style={{margin: "1em"}} id="outlined-basic" label="Zabieg lub usługa" variant="outlined" onChange={handleChangeServicesTreatments}/>
                            </div>
                        </Typography>
                    </ThemeProvider>
                    <div className="animals">
                        {vets.map((vet, index) => {
                            return(
                                <div className="menu__card animals__card" style={{height: "400px"}} onClick={() => handleClick(vet.id)}>
                                    <img className="icon__circle" src={vet.profilePicture} alt="pet1"></img>
                                    <h1>{vet.vet}</h1>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Vets;