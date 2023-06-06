import React, { useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import * as Yup from 'yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });


const ChooseOwnerAndPet = React.forwardRef(({ ownerWithPet, ownersWithPets, ownerWithPets, onOwnerChanged, onOwnerAndPetChanged }, ref) =>{
    const [owner, setOwner] = React.useState(...ownerWithPet.owner);
    // const [ownerWithPets, setOwnerWithPets] = React.useState(ownerWithPets)
    const [ownerAndPatient, setOwnerAndPatient] = React.useState(ownerWithPet)
    const [errors, setErrors] = React.useState({ 
        owner: ""
    });
    // const [isFirstRender, setFirstRender] = React.useState(true)
    // useEffect(() => {
    //     if(isFirstRender === true){
    //         let data = [...errors]
    //         let newfieldError = {owner: ''}
    //         data[0] = { errors: newfieldError };
    //         setErrors(data)
    //         setFirstRender(false)
    //     }
    //   }, [isFirstRender]); 

    const schema = Yup.object().shape({
        owner: Yup.string()
          .required('Pole Właściciel jest wymagane.'),
        patient: Yup.string()
            .required("Pole Pacject jest wymagane."),
      });

      React.useImperativeHandle(ref, () => ({
        validateData: checkValidation
      }));

      const checkValidation = () => {
        return new Promise((resolve, reject) => {
            schema
                .validate(ownerAndPatient, { abortEarly: false })
                .then(() => {
                    resolve(true);
                })
                .catch((validationErrors) => {
                    const errors = {};
                    validationErrors.inner.forEach((error) => {
                    errors[error.path] = error.message;
                    });
                    setErrors(errors);
                    console.error('Form validation errors:', errors);
                    reject(false)
            })
        })
    }

      const handleChangeOwner = async (event, value) => {
    let chosenOwner = ownersWithPets.filter((str) => str.fullName === value)
    // Żeby tablica obiektu też się przepisała to trzeba skopiować obiekt
    setOwner(...chosenOwner);
    // setOwnerWithPets(...chosenOwner);
    onOwnerChanged(...chosenOwner)
    if(errors.hasOwnProperty('patient')){
        errors.patient = ""
    }
    validateString("owner", value)
  };

    const validateString = async(name, value) => {
        setOwnerAndPatient({
        ...ownerAndPatient,
        [name]: value
    });
    try {
        await schema.validateAt( [name], { [name]: value});
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      } catch (error) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
      }
  };
  const handleChangePatient = async (event, value) => {
    validateString("patient", value)
    let chosenPet = owner.pets.find((str) => str.name === value)
    onOwnerAndPetChanged({
        ...ownerAndPatient,
        "patient": chosenPet.name,
        "patientId": chosenPet.id
    })
  }
    return(
        <div style={{display: "flex", justifyContent: "center"}}>
            <ThemeProvider theme={theme}>
                <Typography component={'span'} variant={'body2'}>
            <Autocomplete
            disablePortal
            value={ownerAndPatient.owner}
            id="combo-box-demo"
            options={ownersWithPets.map(a => a.fullName)}
            sx={{ width: 400}}
            className="visit__firstInput"
            name="owner"
            // renderInput={(params) => <TextField {...params} label="Właściciel" />}
            onChange={(e, value) => handleChangeOwner(e, value)}
            ListboxProps={
                {
                  style:{
                      maxHeight: '300px',
                  }
                }
              }
              renderInput={(params) =>
                <TextField
                    {...params}
                    label="Właściciel"
                    required
                    error={!!errors.owner}
                    helperText={errors.owner}
                />}
        ></Autocomplete>
        {ownerWithPet.owner !== null && typeof owner !== "undefined" ?
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={ownerAndPatient.patient}
            options={ownerWithPets !== null && typeof ownerWithPets !== "undefined" ? ownerWithPets.pets.map(a => a.name) : []}
            sx={{ width: 400}}
            name="patient"
            onChange={(e, value) => handleChangePatient(e, value)}
            className="visit__firstInput"
            renderInput={(params) =>
                <TextField
                    {...params}
                    label="Pacjent"
                    required
                    error={!!errors.patient}
                    helperText={errors.patient}
                />}
            ListboxProps={
                {
                  style:{
                      maxHeight: '300px',
                  }
                }
              }
        ></Autocomplete>: <div></div>}
        </Typography>
        </ThemeProvider>
        </div>
    )
})

export default ChooseOwnerAndPet;