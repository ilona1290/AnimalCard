import React, { useState } from "react";
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
const AddRabiesVaccination = React.forwardRef(( {rabiesVaccinations, onRabiesVaccinationsChanged }, ref) => {
    const [addedRabiesVaccinations, setAddedRabiesVaccinations] = useState(rabiesVaccinations)
    const [isToggle, setToggle] = useState(false);
    const arrowRef = React.useRef(null)
    const [errors, setErrors] = React.useState({ 
        name: "",
        series: "",
        termValidityRabies: "",
        termNextRabies: ""
    });

    const schema = Yup.object().shape({
        name: Yup.string()
            .required('Pole Nazwa Szczepionki jest wymagane.'),
        // customType: Yup.string()
        //     .required('Pole Rodzaj wizyty jest wymagane.'),
        series: Yup.string()
          .required('Pole Nr serii jest wymagane.'),
        termValidityRabies: Yup.date()
            .required("Pole Data ważności szczepionki jest wymagane."),
        termNextRabies : Yup.date()
          .required('Pole Termin następnej wizyty jest wymagane.'),
      });

      React.useImperativeHandle(ref, () => ({
        validateData: checkValidation
      }));

    const checkValidation = () => {
        return new Promise((resolve, reject) => {
            schema
                .validate(addedRabiesVaccinations[0], { abortEarly: false })
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

    const handleChangeNumber = (event, index) => {
        const regex = /^[0-9\b]+$/;
        if (event.target.value === "" || regex.test(event.target.value)) {
            let data = [...rabiesVaccinations];
            data[index][event.target.name] = event.target.value;
            validateString(event.target.name, event.target.value)
            setAddedRabiesVaccinations(data);
            onRabiesVaccinationsChanged(data)
        }
        
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
        let newfield = {id: nodeId++, name: '', series: "", termValidityRabies: null, termNextRabies: null}
        setAddedRabiesVaccinations([...addedRabiesVaccinations, newfield])
        onRabiesVaccinationsChanged(addedRabiesVaccinations)
        if(addedRabiesVaccinations.length === 0){
            let elem = document.getElementsByClassName("arrow")
            elem[0].className = "arrow active"
        }
        if(arrowRef.current != null && arrowRef.current.className === "arrow"){
            arrowRef.current.click();
        }
        let button = document.getElementsByClassName("visit__addNewItem")
        button[0].style.visibility = "hidden"
    }

    const removeNewItem = (index, elemId) => {
        let element = document.getElementById(`elem-${elemId}`)
        element.className = "visit__form animateOut"
        isRemoving = true;
        // splice zwraca to co usuwa, dlatego w copy dostawaliśmy jeden element.
        // let copy = rabiesVaccinations.splice(index, 1);
        
        setTimeout(function() {
            let copy = [...addedRabiesVaccinations]
            copy.splice(index, 1)
            setAddedRabiesVaccinations(copy)
            onRabiesVaccinationsChanged(copy)
            // Aby następnemu elementowi nie ustawiła się animacja wyjścia!!!!!!!!!!!!!!!!!!!!!!!!!!
            element.className = "visit__form"
        }, 700)
        let button = document.getElementsByClassName("visit__addNewItem")
        button[0].style.visibility = "visible"
    }

    const handleNameChange = (event, index, date) => {
        let data = [...addedRabiesVaccinations];
        if(typeof date === "undefined"){
            data[index][event.target.name] = event.target.value;
            validateString(event.target.name, event.target.value)
        }
        else{
            data[index][date] = dayjs(event.$d.toISOString());
            validateDate(date, dayjs(event.$d.toISOString()))
        }
        
        setAddedRabiesVaccinations(data);
        onRabiesVaccinationsChanged(data)
    }

    const validateDate = async(name, value) => {
        try {
            await schema.validateAt( [name], { [name]: dayjs(value.$d.toISOString()) });
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
          } catch (error) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
          }
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
            <div className="visit__element">
                    <div className={addedRabiesVaccinations.length === 0 ? "displayNone__div" : ""}><span ref={arrowRef} className="arrow" onClick={toggleArrow}><span></span><span></span></span></div>
                    Szczepienia przeciwko wściekliźnie
                    <button className="visit__addNewItem" style={{visibility: addedRabiesVaccinations.length === 0 ? "visible": "hidden"}} onClick={handleAddNewItem}>
                        +
                        <span className="tooltiptext">Dodaj szczepienie</span>
                    </button>
                </div>
                <div className="visit__container__form">
                    {addedRabiesVaccinations.map((elem, index) => {
                        return (
                    <div className={`visit__form  ${index === addedRabiesVaccinations.length - 1 && isRemoving === false && isToggle === false ? "animateIn" : ""}`} id={`elem-${elem.id}`}>
                        <ThemeProvider theme={theme}>
                            <Typography component={'span'} variant={'body2'}>
                                <button className="visit__removeItem" onClick={() => removeNewItem(index, elem.id)}>
                                    x
                                    <span className="tooltiptext">Usuń szczepienie</span>
                                </button>
                                <TextField className="visit__firstInput" id="outlined-basic" name="name" label="Nazwa szczepionki"
                                    onChange={(event) => handleNameChange(event, index)} 
                                    variant="outlined" value={elem.name}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                                <TextField className="visit__secondInput" type="text" id="outlined-basic" label="Nr serii"
                                    name="series" variant="outlined" onChange={(event) => handleChangeNumber(event, index)} 
                                    value={elem.series}
                                    error={!!errors.series}
                                    helperText={errors.series}
                                /><br></br>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                                    <DatePicker className="visit__dateField" name="termValidityRabies" label="Data ważności szczepionki" 
                                        onChange={(event) => handleNameChange(event, index, 'termValidityRabies')} 
                                        value={elem.termValidityRabies}
                                        disablePast
                                        slotProps={{
                                            textField: {
                                                readOnly: true,
                                                helperText: errors.termValidityRabies,
                                                error: errors.termValidityRabies,
                                            }
                                        }}
                                    />
                                </LocalizationProvider><br></br>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                                    <DatePicker className="visit__dateField" name="termNextRabies" label="Termin następnego szczepienia" 
                                        onChange={(event) => handleNameChange(event, index, 'termNextRabies')} 
                                        value={elem.termNextRabies}
                                        disablePast
                                        slotProps={{
                                            textField: {
                                                readOnly: true,
                                                helperText: errors.termNextRabies,
                                                error: errors.termNextRabies,
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            </Typography>
                        </ThemeProvider>
                    </div>
                    )})}
                </div>
        </div>
    )
})

export default AddRabiesVaccination;