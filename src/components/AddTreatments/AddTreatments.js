import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import * as Yup from 'yup';
const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

  let nodeId = 0;
  let isRemoving = false;

  const AddTreatments = React.forwardRef(( {treatments, onTreatmentsChanged }, ref) => {
    const [addedTreatments, setAddedTreatments] = useState(treatments)
    const [isToggle, setToggle] = useState(false);
    const arrowRef = React.useRef(null)
    const [errors, setErrors] = React.useState([]);
    const [isFirstRender, setFirstRender] = React.useState(true)

    useEffect(() => {
        if(isFirstRender === true){
            let data = [...errors]
            for(let i = 0; i < treatments.length; i++){
                let newfieldError = {treatmentName: '', treatmentDiagnosis: '', treatmentDescription: '', recommendations: ''}
                data[i] = { errors: newfieldError };
                setErrors(data)
            }
            setFirstRender(false)
        }
      }, [isFirstRender]); 
    

    const schema = Yup.object().shape({
        treatmentName: Yup.string()
            .required('Pole Nazwa zabiegu jest wymagane.'),
        treatmentDiagnosis: Yup.string()
            .required('Pole Diagnoza jest wymagane.'),
        treatmentDescription: Yup.string()
          .required('Pole Opis zabiegu jest wymagane.'),
          recommendations: Yup.string()
            .required("Pole Zalecenia jest wymagane."),
      });

      React.useImperativeHandle(ref, () => ({
        validateData: checkValidation
      }));

    const checkValidation = async () => {
        const validationPromises = addedTreatments.map((treatment, index) => {
          return schema.validate(treatment, { abortEarly: false })
            .then(() => {
              return { errors: {treatmentName: '', treatmentDiagnosis: '', treatmentDescription: '', recommendations: ''} }; // Brak błędów
            })
            .catch((validationErrors) => {
              const errors = {treatmentName: '', treatmentDiagnosis: '', treatmentDescription: '', recommendations: ''};
              validationErrors.inner.forEach((error) => {
                errors[error.path] = error.message;
              });
              return { errors }; // Błędy walidacji
            });
        });
      
        let isCorrect = true;
        const results = await Promise.all(validationPromises);
        const _ = require('lodash');
        const expectedErrors = {treatmentName: '', treatmentDiagnosis: '', treatmentDescription: '', recommendations: ''};
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
        let newfield = {id: nodeId++, treatmentName: '', treatmentDiagnosis: '', treatmentDescription: '', recommendations: ''}
        let newfieldError = {treatmentName: '', treatmentDiagnosis: '', treatmentDescription: '', recommendations: ''}
        setAddedTreatments([...addedTreatments, newfield])
        let data = [...errors]
        data[errors.length] = { errors: newfieldError };;
        setErrors(data)
        onTreatmentsChanged(addedTreatments)
        if(addedTreatments.length === 0){
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
            let copy = [...addedTreatments]
            copy.splice(index, 1)
            setAddedTreatments(copy)
            onTreatmentsChanged(copy)
            // Aby następnemu elementowi nie ustawiła się animacja wyjścia!!!!!!!!!!!!!!!!!!!!!!!!!!
            element.className = "visit__form"
        }, 700)
    }

    const handleNameChange = (event, index) => {
        let data = [...addedTreatments];
        data[index][event.target.name] = event.target.value;
        validate(event.target.name, event.target.value, index)

        setAddedTreatments(data);
        onTreatmentsChanged(data)
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
                    <div className={addedTreatments.length === 0 ? "displayNone__div" : ""}><span ref={arrowRef} className="arrow" onClick={toggleArrow}><span></span><span></span></span></div>
                    Zabiegi
                    <button className="visit__addNewItem" onClick={handleAddNewItem}>
                        +
                        <span className="tooltiptext">Dodaj zabieg</span>
                    </button>
                </div>
                <div className="visit__container__form">
                    {addedTreatments.map((elem, index) => {
                        return (
                    <div className={`visit__form  ${index === addedTreatments.length - 1 && isRemoving === false && isToggle === false ? "animateIn" : ""}`} id={`elem-${elem.id}`}>
                        <ThemeProvider theme={theme}>
                            <Typography component={'span'} variant={'body2'}>
                                <button className="visit__removeItem" onClick={() => removeNewItem(index, elem.id)}>
                                    x
                                    <span className="tooltiptext">Usuń zabieg</span>
                                </button>
                                <TextField className="visit__textAreaField" id="outlined-basic" name="treatmentName" label="Nazwa zabiegu"
                                    onChange={(event) => handleNameChange(event, index)} 
                                    variant="outlined" value={elem.treatmentName}
                                    error={errors.length !== 0 && !!errors[index].errors.treatmentName}
                                    helperText={errors.length !== 0 && errors[index].errors.treatmentName}
                                /><br></br>
                                <TextField className="visit__textAreaField" id="outlined-basic" name="treatmentDiagnosis" label="Diagnoza"
                                    onChange={(event) => handleNameChange(event, index)} 
                                    variant="outlined" value={elem.treatmentDiagnosis}
                                    multiline rows={4}
                                    error={errors.length !== 0 && !!errors[index].errors.treatmentDiagnosis}
                                    helperText={errors.length !== 0 && errors[index].errors.treatmentDiagnosis}
                                /><br></br>
                                <TextField className="visit__textAreaField" id="outlined-basic" name="treatmentDescription" label="Opis zabiegu"
                                    onChange={(event) => handleNameChange(event, index)} 
                                    variant="outlined" value={elem.treatmentDescription}
                                    multiline rows={4}
                                    error={errors.length !== 0 && !!errors[index].errors.treatmentDescription}
                                    helperText={errors.length !== 0 && errors[index].errors.treatmentDescription}
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

export default AddTreatments;