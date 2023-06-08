import React, { useState, useEffect } from "react";
import { getData } from "../../components/Services/AccessAPI";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText'
import Loader from "../../components/Loader";
import * as Yup from 'yup';

import "./AnimalCardForm.css"
import PreviewPetProfile from "../../components/PreviewPetProfile/PreviewPetProfile";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

function AnimalCardForm({ type, petData}){
    const [showPreview, setShowPreview] = useState(false);
    const [owners, setOwners] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [formPhoto, setFormPhoto] = useState(null);
    const [pet, setPet] = useState(petData)

    const [errors, setErrors] = useState({ 
        owner: "",
        identityNumber: "",
        name: "",
        sex: "",
        dateBirth: "",
        breed: "",
        color: "",
        hairType: "",
    });

    const schema = Yup.object().shape({
        owner: Yup.string()
            .required('Pole Właściciel jest wymagane.'),
        identityNumber: Yup.string()
          .required('Pole Numer identyfikacyjny jest wymagane.'),
        name: Yup.string()
            .required("Pole Imię jest wymagane."),
        sex: Yup.string()
            .required("Pole Płeć jest wymagane."),
        dateBirth : Yup.date()
          .required('Pole Data urodzenia jest wymagane.')
          .max(new Date(), 'Data urodzenia nie może być późniejsza niż dzisiejsza.'),
        breed: Yup.string()
            .required("Pole Rasa jest wymagane."),
        color: Yup.string()
            .required("Pole Barwa jest wymagane."),
        hairType: Yup.string()
            .required("Pole Rodzaj sierści jest wymagane."),
      });

    useEffect(() => {
        getData('api/Owner').then((result) => {
            setOwners(result.owners);
            setLoading(false);
        })
    }, [])

    const handleShowPreview = () => {
        schema
      .validate(pet, { abortEarly: false })
      .then(() => {
        setShowPreview(!showPreview)
        // Perform form submission logic here
      })
      .catch((validationErrors) => {
        const errors = {};

        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });

        setErrors(errors);
        console.error('Form validation errors:', errors);
      });
    }

    const handleImageChange = (e) => {
        var image = document.getElementById('output');
	    image.src = URL.createObjectURL(e.target.files[0]);
        setPet({
            ...pet,
            "photo": image.src
        });
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('image', element);
        }
        form.append('fileName', "Img");
        setFormPhoto(form)
    };

    const handleChange = async (event, date, ownerValue) => {
        if(typeof date === "undefined"){
            if(typeof ownerValue !== "undefined"){
                try {
                    setPet({
                        ...pet,
                        "owner": ownerValue
                    });
                    await schema.validateAt("owner", { "owner": ownerValue});
                    setErrors((prevErrors) => ({ ...prevErrors, "owner": '' }));
                  } catch (error) {
                    setErrors((prevErrors) => ({ ...prevErrors, "owner": error.message }));
                  }
            }
            else{
                const { name, value } = event.target;
                if(name === "identityNumber"){
                    if(isNaN(value)) return;
                    else{
                        setPet({
                            ...pet,
                            "identityNumber": value
                        });
                        try {
                            await schema.validateAt("identityNumber", { "identityNumber": value });
                            setErrors((prevErrors) => ({ ...prevErrors, "identityNumber": '' }));
                        } catch (error) {
                            setErrors((prevErrors) => ({ ...prevErrors, "identityNumber": error.message }));
                        }
                    }
                }else{
                    setPet({
                        ...pet,
                        [name]: value
                    });
                    try {
                        await schema.validateAt([name], { [name]: value});
                        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
                      } catch (error) {
                        setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
                      }
                }
            }
        }
        else{
            setPet({
                ...pet,
                "dateBirth": dayjs(event.$d.toISOString())
            });
            try {
                await schema.validateAt("dateBirth", { "dateBirth": dayjs(event.$d.toISOString()) });
                setErrors((prevErrors) => ({ ...prevErrors, "dateBirth": '' }));
              } catch (error) {
                setErrors((prevErrors) => ({ ...prevErrors, "dateBirth": error.message }));
              }
        }
    }

    return(
        <div style={{width:"100%"}}>
            {isLoading && <Loader />}
            {!isLoading && <div>
            {showPreview === true ? <PreviewPetProfile type={type} handleShowPreview={handleShowPreview} pet={pet} owners={owners} formPhoto={formPhoto}/> : <div><div style={{width: "100%", paddingTop: "10em", display: "flex"}}>
            {type === "create" ? 
            <Link to="/vetMenu">
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "2%", top: "3.5em"}}>
                    <p>Powrót</p>
                </button>
            </Link> : 
            <Link to={`/pets/${pet.id}/profile`}>
            <button className="header__buttons__end__btn" style={{position: "absolute", right: "2%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
        </Link>
            }
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
                                value={pet.owner || null}
                                options={owners.map(a => a.fullName)}
                                name="owner"
                                onChange={(e, value) => handleChange(e, undefined, value)}
                                renderInput={(params) =>
                                <TextField
                                    {...params}
                                    className="pet__form__input"
                                    label="Właściciel"
                                    required
                                    error={!!errors.owner}
                                    helperText={errors.owner}
                                />}
                            />
                            <TextField
                                className="pet__form__input"
                                id="outlined-basic"
                                name="identityNumber"
                                label="Numer identyfikacyjny"
                                onChange={(event) => handleChange(event)}
                                value={pet.identityNumber} variant="outlined"
                                required
                                error={!!errors.identityNumber}
                                helperText={errors.identityNumber}
                            />
                            <TextField
                                className="pet__form__input"
                                id="outlined-basic" name="name"
                                label="Imię"
                                onChange={(event) => handleChange(event)}
                                value={pet.name}
                                variant="outlined"
                                required
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <br></br>
                            <FormControl className="pet__form__input" required error={!!errors.sex}>
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
                                <FormHelperText>{errors.sex}</FormHelperText>
                            </FormControl>
                            <br></br>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                                <DatePicker
                                    className="pet__form__input"
                                    name="dateBirth" label="Data urodzenia *"
                                    onChange={(event) => handleChange(event, "date")}
                                    defaultValue={pet.dateBirth !== "" ? pet.dateBirth : null}
                                    required
                                    slotProps={{
                                        textField: {
                                            helperText: errors.dateBirth,
                                            error: errors.dateBirth
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                            <TextField
                                className="pet__form__input"
                                id="outlined-basic"
                                name="breed"
                                label="Rasa"
                                onChange={(event) => handleChange(event)}
                                value={pet.breed}
                                variant="outlined"
                                required
                                error={!!errors.breed}
                                helperText={errors.breed}
                            />
                            <TextField
                                className="pet__form__input"
                                id="outlined-basic" name="color"
                                label="Barwa"
                                onChange={(event) => handleChange(event)}
                                value={pet.color} variant="outlined"
                                required
                                error={!!errors.color}
                                helperText={errors.color}
                            />
                            <TextField
                                className="pet__form__input"
                                id="outlined-basic" name="hairType"
                                label="Rodzaj sierści"
                                onChange={(event) => handleChange(event)}
                                value={pet.hairType}
                                variant="outlined"
                                required
                                    error={!!errors.hairType}
                                    helperText={errors.hairType}
                            />
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
    )
}

export default AnimalCardForm;