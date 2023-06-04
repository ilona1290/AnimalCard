import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

  let nodeId = 0;
  let isRemoving = false;

  const AddDiseases = React.forwardRef(( {diseases, onDiseasesChanged }, ref) => {
    const [addedDiseases, setAddedDiseases] = useState(diseases)
    const [isToggle, setToggle] = useState(false);
    const arrowRef = React.useRef(null)
    const [errors, setErrors] = React.useState([]);
    const [isFirstRender, setFirstRender] = React.useState(true)

    useEffect(() => {
        if(isFirstRender === true){
            let data = [...errors]
            for(let i = 0; i < diseases.length; i++){
                let newfieldError = {diseaseName: '', diseaseDescription: '', treatmentDescription: '', prescribedMedications: '', recommendations: ''}
                data[i] = { errors: newfieldError };
                setErrors(data)
            }
            setFirstRender(false)
        }
      }, [isFirstRender]); 
    

    const schema = Yup.object().shape({
        diseaseName: Yup.string()
            .required('Pole Nazwa choroby jest wymagane.'),
        diseaseDescription: Yup.string()
            .required('Pole Opis choroby jest wymagane.'),
        treatmentDescription: Yup.string()
          .required('Pole Opis leczenia jest wymagane.'),
        prescribedMedications: Yup.string()
          .required('Pole Przepisane leki jest wymagane.'),
        recommendations: Yup.string()
            .required("Pole Zalecenia jest wymagane."),
      });

      React.useImperativeHandle(ref, () => ({
        validateData: checkValidation
      }));

    const checkValidation = async () => {
        const validationPromises = addedDiseases.map((disease, index) => {
          return schema.validate(disease, { abortEarly: false })
            .then(() => {
              return { errors: {diseaseName: '', diseaseDescription: '', treatmentDescription: '', prescribedMedications: '', recommendations: ''} }; // Brak błędów
            })
            .catch((validationErrors) => {
              const errors = {diseaseName: '', diseaseDescription: '', treatmentDescription: '', prescribedMedications: '', recommendations: ''};
              validationErrors.inner.forEach((error) => {
                errors[error.path] = error.message;
              });
              return { errors }; // Błędy walidacji
            });
        });
      
        let isCorrect = true;
        const results = await Promise.all(validationPromises);
        const _ = require('lodash');
        const expectedErrors = {diseaseName: '', diseaseDescription: '', treatmentDescription: '', prescribedMedications: '', recommendations: ''};
        console.log(results)
        const updatedErrors = [];
        results.forEach(( errors, index ) => {
            updatedErrors[index] = errors;
            console.log(errors)
            if (_.isEqual(errors.errors, expectedErrors)) {
                isCorrect = true
            }
            else{
                isCorrect = false
                return
            }
        });
        setErrors(updatedErrors);
        console.log(updatedErrors)
        console.log(isCorrect)
        return new Promise((resolve, reject) => {
            if(isCorrect === true){
                resolve(true)
            }
            else{
                reject(false)
            }
        })
      };

    const toggleArrow = (event) => {
        setToggle(true);
        // toggle class w React'ie 
        event.target.classList.toggle('active');
        if(event.target.className === "arrow"){
            let element = document.getElementsByClassName('visit__container__form')[0]
            element.className = "visit__container__form animateOut";
            setTimeout(function() {
                element.className = "displayNone__div"
            }, 700)
        }
        else{
            let element = document.getElementsByClassName('displayNone__div')[0]
            element.className = "visit__container__form displayBlock__div animateIn";
        }
    }

    const handleAddNewItem = () => {
        setToggle(false)
        isRemoving = false
        let newfield = {id: nodeId++, diseaseName: '', diseaseDescription: '', treatmentDescription: '', prescribedMedications: '', recommendations: ''}
        let newfieldError = {diseaseName: '', diseaseDescription: '', treatmentDescription: '', prescribedMedications: '', recommendations: ''}
        setAddedDiseases([...addedDiseases, newfield])
        let data = [...errors]
        data[errors.length] = { errors: newfieldError };;
        setErrors(data)
        onDiseasesChanged([...addedDiseases, newfield])
        if(addedDiseases.length === 0){
            let elem = document.getElementsByClassName("arrow")
            elem[0].className = "arrow active"
        }
        if(arrowRef.current != null && arrowRef.current.className === "arrow"){
            arrowRef.current.click();
        }
    }

    const removeNewItem = (index, elemId) => {
        let element = document.getElementById(`elem-${elemId}`)
        element.className = "visit__form animateOut"
        isRemoving = true;
        // splice zwraca to co usuwa, dlatego w copy dostawaliśmy jeden element.
        // let copy = rabiesVaccinations.splice(index, 1);

        setTimeout(function() {
            let copy = [...addedDiseases]
            copy.splice(index, 1)
            setAddedDiseases(copy)
            onDiseasesChanged(copy)
            // Aby następnemu elementowi nie ustawiła się animacja wyjścia!!!!!!!!!!!!!!!!!!!!!!!!!!
            element.className = "visit__form"
        }, 700)
    }

    const handleNameChange = (event, index) => {
        let data = [...addedDiseases];
        data[index][event.target.name] = event.target.value;
        validate(event.target.name, event.target.value, index)

        setAddedDiseases(data);
        onDiseasesChanged(data)
    }

    const validate = async(name, value, index) => {
        console.log(name, value, index)
        try {
            await schema.validateAt( name, { [name]: value});
            let updateErrors = [...errors]
            // Jeśli index jest pod zmienną, errors jest konkretną nazwą, a name też siedzi pod zmienną
            updateErrors[index].errors[name] = ''
            setErrors(updateErrors);
          } catch (error) {
            console.log(error)
            let updateErrors = [...errors]
            updateErrors[index].errors[name] = error.message
            setErrors(updateErrors);
          }
    }

    return(
        <div>
            <div className="visit__element">
                    <div className={addedDiseases.length === 0 ? "displayNone__div" : ""}><span ref={arrowRef} className="arrow" onClick={toggleArrow}><span></span><span></span></span></div>
                    Choroby
                    <button className="visit__addNewItem" onClick={handleAddNewItem}>
                        +
                        <span className="tooltiptext">Dodaj chorobę</span>
                    </button>
                </div>
                <div className="visit__container__form">
                    {addedDiseases.map((elem, index) => {
                        return (
                    <div className={`visit__form  ${index === addedDiseases.length - 1 && isRemoving === false && isToggle === false ? "animateIn" : ""}`} id={`elem-${elem.id}`}>
                        <ThemeProvider theme={theme}>
                            <Typography component={'span'} variant={'body2'}>
                                <button className="visit__removeItem" onClick={() => removeNewItem(index, elem.id)}>
                                    x
                                    <span className="tooltiptext">Usuń chorobę</span>
                                </button>
                                <TextField className="visit__textAreaField" id="outlined-basic" name="diseaseName" label="Nazwa choroby"
                                    onChange={(event) => handleNameChange(event, index)} 
                                    variant="outlined" value={elem.diseaseName}
                                    error={errors.length !== 0 && !!errors[index].errors.diseaseName}
                                    helperText={errors.length !== 0 && errors[index].errors.diseaseName}
                                /><br></br>
                                <TextField className="visit__textAreaField" id="outlined-basic" name="diseaseDescription" label="Opis choroby"
                                    onChange={(event) => handleNameChange(event, index)} 
                                    variant="outlined" value={elem.diseaseDescription}
                                    multiline rows={4}
                                    error={errors.length !== 0 && !!errors[index].errors.diseaseDescription}
                                    helperText={errors.length !== 0 && errors[index].errors.diseaseDescription}
                                /><br></br>
                                <TextField className="visit__textAreaField" id="outlined-basic" name="treatmentDescription" label="Opis leczenia"
                                    onChange={(event) => handleNameChange(event, index)} 
                                    variant="outlined" value={elem.treatmentDescription}
                                    multiline rows={4}
                                    error={errors.length !== 0 && !!errors[index].errors.treatmentDescription}
                                    helperText={errors.length !== 0 && errors[index].errors.treatmentDescription}
                                /><br></br>
                                <TextField className="visit__textAreaField" id="outlined-basic" name="prescribedMedications" label="Przepisane leki"
                                    onChange={(event) => handleNameChange(event, index)} 
                                    variant="outlined" value={elem.prescribedMedications}
                                    multiline rows={4}
                                    error={errors.length !== 0 && !!errors[index].errors.prescribedMedications}
                                    helperText={errors.length !== 0 && errors[index].errors.prescribedMedications}
                                /><br></br>
                                <TextField className="visit__textAreaField" id="outlined-basic" name="recommendations" label="Zalecenia"
                                    onChange={(event) => handleNameChange(event, index)} 
                                    variant="outlined" value={elem.recommendations}
                                    multiline rows={4}
                                    error={errors.length !== 0 && !!errors[index].errors.recommendations}
                                    helperText={errors.length !== 0 && errors[index].errors.recommendations}
                                />
                            </Typography>
                        </ThemeProvider>
                    </div>
                    )})}
                </div>
        </div>
    )
})

export default AddDiseases;