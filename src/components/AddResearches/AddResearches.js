import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import * as Yup from 'yup';

import './AddResearches.css'

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

  let nodeId = 0;
  let isRemoving = false;
const AddResearches = React.forwardRef(( {researches, onResearchesChanged }, ref) => {
    const [addedResearches, setAddedResearches] = useState(researches)
    const [isToggle, setToggle] = useState(false);
    const arrowRef = React.useRef(null)
    const [errors, setErrors] = React.useState({ 
        researchesList: ""
    });

    const schema = Yup.object().shape({
        researchesList: Yup.string()
            .required('Pole Lista badań jest wymagane.')
      });

      React.useImperativeHandle(ref, () => ({
        validateData: checkValidation
      }));

    const checkValidation = () => {
        return new Promise((resolve, reject) => {
            schema
                .validate(addedResearches[0], { abortEarly: false })
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

    const toggleArrow = (event) => {
        setToggle(true);
        // toggle class w React'ie 
        event.target.classList.toggle('active');
        if(event.target.className === "addResearch__arrow"){
            let element = document.getElementsByClassName('addResearch__visit__container__form')[0]
            element.className = "addResearch__visit__container__form animateOut";
            setTimeout(function() {
                element.className = "addResearch__displayNone__div"
            }, 700)
        }
        else{
            let element = document.getElementsByClassName('addResearch__displayNone__div')[0]
            element.className = "addResearch__visit__container__form addResearch__displayBlock__div animateIn";
        }
    }

    const handleAddNewItem = () => {
        setToggle(false)
        isRemoving = false
        let newfield = {id: nodeId++, researchesList: ''}
        setAddedResearches([...addedResearches, newfield])
        onResearchesChanged([...addedResearches, newfield])
        if(addedResearches.length === 0){
            let elem = document.getElementsByClassName("addResearch__arrow")
            elem[0].className = "addResearch__arrow active"
        }
        if(arrowRef.current != null && arrowRef.current.className === "addResearch__arrow"){
            arrowRef.current.click();
        }
        let button = document.getElementsByClassName("addResearch__visit__addNewItem")
        button[0].style.visibility = "hidden"
    }

    const removeNewItem = (index, elemId) => {
        let element = document.getElementById(`addResearch__elem-${elemId}`)
        element.className = "addResearch__visit__form animateOut"
        isRemoving = true;

        
        setTimeout(function() {
            let copy = [...addedResearches]
            copy.splice(index, 1)
            setAddedResearches(copy)
            onResearchesChanged(copy)
            // Aby następnemu elementowi nie ustawiła się animacja wyjścia!!!!!!!!!!!!!!!!!!!!!!!!!!
            element.className = "addResearch__visit__form"
        }, 700)
        let button = document.getElementsByClassName("addResearch__visit__addNewItem")
        button[0].style.visibility = "visible"
    }

    const handleNameChange = (event, index) => {
        let data = [...addedResearches];
        if(typeof date === "undefined"){
            data[index][event.target.name] = event.target.value;
            validateString(event.target.name, event.target.value)
        }
        setAddedResearches(data);
        onResearchesChanged(data)
    }

    const validateString = async(name, value) => {
        try {
            await schema.validateAt( [name], { [name]: value});
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
          } catch (error) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
          }
    }

    return(
        <div>
            <div className="addResearch__visit__element">
                    <div className={addedResearches.length === 0 ? "addResearch__displayNone__div" : ""}><span ref={arrowRef} className="addResearch__arrow" onClick={toggleArrow}><span></span><span></span></span></div>
                    Badania
                    <button className="addResearch__visit__addNewItem" style={{visibility: addedResearches.length === 0 ? "visible": "hidden"}} onClick={handleAddNewItem}>
                        +
                        <span className="addResearch__tooltiptext">Dodaj badanie</span>
                    </button>
                </div>
                <div className="addResearch__visit__container__form">
                    {addedResearches.map((elem, index) => {
                        return (
                    <div className={`addResearch__visit__form  ${index === addedResearches.length - 1 && isRemoving === false && isToggle === false ? "animateIn" : ""}`} id={`addResearch__elem-${elem.id}`}>
                        <ThemeProvider theme={theme}>
                            <Typography component={'span'} variant={'body2'}>
                                <button className="addResearch__visit__removeItem" onClick={() => removeNewItem(index, elem.id)}>
                                    x
                                    <span className="addResearch__tooltiptext">Usuń badanie</span>
                                </button>
                                <TextField className="visit__textAreaField" id="outlined-basic" name="researchesList" label="Lista badań (wypisz badane czynniki)"
                                    onChange={(event) => handleNameChange(event, index)}
                                    variant="outlined" value={elem.researchesList}
                                    multiline rows={4}
                                    error={!!errors.researchesList}
                                    helperText={errors.researchesList}
                                />
                                <h4>Z uwagi na to, że wyniki badań nie muszą być odrazu dostępne, nie wymagamy wgrania ich teraz. Jeżeli wyniki będą 
                                    dostępne możesz je przesłać w panelu książeczki zdrowia zwierzęcia w zakładce Badania.
                                </h4>
                            </Typography>
                        </ThemeProvider>
                    </div>
                    )})}
                </div>
        </div>
    )
})

export default AddResearches;