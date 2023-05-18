import React, { useState, useEffect } from "react";
import { getData, postData } from "../../components/Services/AccessAPI";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import Loader from "../../components/Loader";

import "./CreateAnimalCard.css"
import petDefault from "./happy (6).png"
import PreviewPetProfile from "../../components/PreviewPetProfile/PreviewPetProfile";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

function CreateAnimalCard(){
    const [showPreview, setShowPreview] = useState(false);
    // const [owners, setOwners] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const [pet, setPet] = useState({
        owner: "",
        identityNumber: "",
        photo: petDefault,
        name: "",
        sex: "",
        dateBirth: "",
        breed: "",
        color: "",
        hairType: "",
        trademarks: "",
        allergies: "",
        extraInfo: ""
    })
    const owners = ["Jan Nowak", "Marek Kowalski"]
    // useEffect(() => {
    //     getData('api/Owner/GetOwners').then((result) => {
    //         console.log(result)
    //         setOwners(result.owners);
    //         setLoading(false);
    //     })
    // }, [])

    const handleShowPreview = () => {
        setShowPreview(!showPreview)
    }

    const handleImageChange = (e) => {
        var image = document.getElementById('output');
	    image.src = URL.createObjectURL(e.target.files[0]);
        setPet({
            ...pet,
            "photo": image.src
        });
    };

    const handleChange = (event, date) => {
        if(typeof date === "undefined"){
            const value = event.target.value;
            setPet({
                ...pet,
                [event.target.name]: value
            });
        }
        else{
            setPet({
                ...pet,
                "dateBirth": event.$d.toLocaleDateString()
            });
        }
    }

    return(
        <div style={{width:"100%"}}>
            {isLoading && <Loader />}
            {!isLoading && <div>
            {showPreview === true ? <PreviewPetProfile handleShowPreview={handleShowPreview} pet={pet} /> : <div><div style={{width: "100%", paddingTop: "10em", display: "flex"}}>
            <Link to="/vetMenu">
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "2%", top: "3.5em"}}>
                    <p>Powrót</p>
                </button>
            </Link>
            <div className="pet__container">
                <div className="pet__img__container">
                    <img className="pet__img" id="output" src={pet.photo} name="photo" alt="PetProfilePicture"></img>
                    <label htmlFor="img" className="updateProfile__avatar__btn">Prześlij zdjęcie</label>
                    <input name="Avatar" id = 'img' type="file" style={{visibility:"hidden"}} onChange={(e)=> handleImageChange(e)}/>
                </div>
                <div className="pet__form">
                <div className="pet__firstColumn">
                    <ThemeProvider theme={theme}>
                        <Typography component={'span'} variant={'body2'}>
                            <Autocomplete
                                disablePortal
                                id="outlined-basic"
                                options={owners}
                                // options={owners.map(a => a.fullName)}
                                name="owner"
                                onChange={(e, value) => handleChange(e)}
                                renderInput={(params) => <TextField {...params} className="pet__form__input" label="Właściciel" />}
                                />
                            <TextField className="pet__form__input" id="outlined-basic" name="identityNumber" label="Numer identyfikacyjny" onChange={(event) => handleChange(event)} value={pet.id} variant="outlined" />
                            <TextField className="pet__form__input" id="outlined-basic" name="name" label="Imię" onChange={(event) => handleChange(event)} value={pet.name} variant="outlined" /><br></br>
                            <FormControl className="pet__form__input">
                            <InputLabel id="demo-simple-select-label">Płeć</InputLabel>
                            <Select
                            id="demo-simple-select"
                            name="sex"
                            value={pet.sex}
                            label="Płeć"
                            onChange={(event) => handleChange(event)}
                            
                            >
                                <MenuItem value={"Samiec"}>Samiec</MenuItem>
                                <MenuItem value={"Samica"}>Samica</MenuItem>
                            </Select>
                            </FormControl><br></br>
                            <LocalizationProvider  dateAdapter={AdapterDayjs} adapterLocale="pl">
                                <DatePicker className="pet__form__input" name="dateBirth" label="Data urodzenia" onChange={(event) => handleChange(event, "date")}/>
                            </LocalizationProvider>
                            <TextField className="pet__form__input" id="outlined-basic" name="breed" label="Rasa" onChange={(event) => handleChange(event)} value={pet.breed} variant="outlined" />
                            <TextField className="pet__form__input" id="outlined-basic" name="color" label="Barwa" onChange={(event) => handleChange(event)} value={pet.color} variant="outlined" />
                            <TextField className="pet__form__input" id="outlined-basic" name="hairType" label="Rodzaj sierści" onChange={(event) => handleChange(event)} value={pet.hairType} variant="outlined" />
                            
                        </Typography>
                    </ThemeProvider>
                </div>
                <div className="pet__secondColumn">
                    <ThemeProvider theme={theme}>
                        <Typography component={'span'} variant={'body2'}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Znaki szczególne"
                                name="trademarks"
                                multiline
                                rows={4}
                                className="pet__form__textarea"
                                style={{width: "80%"}}
                                onChange={(event) => handleChange(event)} value={pet.trademarks}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Ewentualne uczulenia"
                                name="allergies"
                                multiline
                                rows={4}
                                className="pet__form__textarea"
                                style={{width: "80%"}}
                                onChange={(event) => handleChange(event)} value={pet.allergies}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Informacje dodatkowe"
                                name="extraInfo"
                                multiline
                                rows={4}
                                className="pet__form__textarea"
                                style={{width: "80%"}}
                                onChange={(event) => handleChange(event)} value={pet.extraInfo}
                            />
                        </Typography>
                    </ThemeProvider>
                </div>
            </div>
                
            </div>
            </div>
            <button className="save__btn" onClick={handleShowPreview}>
                    <p>Zapisz</p>
                </button></div>}</div>}
        </div>
    );
}

export default CreateAnimalCard;