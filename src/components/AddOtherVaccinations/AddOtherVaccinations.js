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
const AddOtherVaccinations = React.forwardRef(( {otherVaccinations, onOtherVaccinationsChanged }, ref) => {
    const [addedOtherVaccinations, setAddedOtherVaccinations] = useState(otherVaccinations)
    const [isToggle, setToggle] = useState(false);
    const arrowRef = React.useRef(null)
    const [errors, setErrors] = React.useState([]);
    const [isFirstRender, setFirstRender] = React.useState(true)

    useEffect(() => {
        if(isFirstRender === true){
            let data = [...errors]
            for(let i = 0; i < otherVaccinations.length; i++){
                let newfieldError = {diseaseName: '', name: '', series: ''}
                data[i] = { errors: newfieldError };
                setErrors(data)
            }
            setFirstRender(false)
        }
      }, [isFirstRender]); // P
    

    const schema = Yup.object().shape({
        diseaseName: Yup.string()
            .required('Pole Nazwa Choroby jest wymagane.'),
        name: Yup.string()
            .required('Pole Nazwa Szczepionki jest wymagane.'),
        series: Yup.string()
          .required('Pole Nr serii jest wymagane.')
      });

      React.useImperativeHandle(ref, () => ({
        validateData: checkValidation
      }));

    const checkValidation = async () => {
        const validationPromises = addedOtherVaccinations.map((vaccination, index) => {
          return schema.validate(vaccination, { abortEarly: false })
            .then(() => {
              return { errors: {diseaseName: '', name: '', series: ""} }; // Brak błędów
            })
            .catch((validationErrors) => {
              const errors = {diseaseName: '', name: '', series: ""};
              validationErrors.inner.forEach((error) => {
                errors[error.path] = error.message;
              });
              return { errors }; // Błędy walidacji
            });
        });
      
        let isCorrect = true;
        const results = await Promise.all(validationPromises);
        const _ = require('lodash');
        const expectedErrors = {diseaseName: '', name: '', series: ""};
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

    const handleChangeNumber = (event, index) => {
        const regex = /^[0-9\b]+$/;
        if (event.target.value === "" || regex.test(event.target.value)) {
            let data = [...addedOtherVaccinations];
            data[index][event.target.name] = event.target.value;
            validate(event.target.name, event.target.value, index)
            setAddedOtherVaccinations(data);
            onOtherVaccinationsChanged(data)
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
        let newfield = {id: nodeId++, diseaseName: '', name: '', series: ""}
        let newfieldError = {diseaseName: '', name: '', series: ""}
        setAddedOtherVaccinations([...addedOtherVaccinations, newfield])
        let data = [...errors]
        data[errors.length] = { errors: newfieldError };;
        setErrors(data)
        onOtherVaccinationsChanged(addedOtherVaccinations)
        if(addedOtherVaccinations.length === 0){
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
            let copy = [...addedOtherVaccinations]
            copy.splice(index, 1)
            setAddedOtherVaccinations(copy)
            onOtherVaccinationsChanged(copy)
            // Aby następnemu elementowi nie ustawiła się animacja wyjścia!!!!!!!!!!!!!!!!!!!!!!!!!!
            element.className = "visit__form"
        }, 700)
    }

    const handleNameChange = (event, index) => {
        let data = [...addedOtherVaccinations];
        data[index][event.target.name] = event.target.value;
        validate(event.target.name, event.target.value, index)

        setAddedOtherVaccinations(data);
        onOtherVaccinationsChanged(data)
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
                    <div className={addedOtherVaccinations.length === 0 ? "displayNone__div" : ""}><span ref={arrowRef} className="arrow" onClick={toggleArrow}><span></span><span></span></span></div>
                    Szczepienia przeciwko innym chorobom zakaźnym
                    <button className="visit__addNewItem" onClick={handleAddNewItem}>
                        +
                        <span className="tooltiptext">Dodaj szczepienie</span>
                    </button>
                </div>
                <div className="visit__container__form">
                    {addedOtherVaccinations.map((elem, index) => {
                        return (
                    <div className={`visit__form  ${index === addedOtherVaccinations.length - 1 && isRemoving === false && isToggle === false ? "animateIn" : ""}`} id={`elem-${elem.id}`}>
                        <ThemeProvider theme={theme}>
                            <Typography component={'span'} variant={'body2'}>
                                <button className="visit__removeItem" onClick={() => removeNewItem(index, elem.id)}>
                                    x
                                    <span className="tooltiptext">Usuń szczepienie</span>
                                </button>
                                <TextField className="visit__dateField" id="outlined-basic" name="diseaseName" label="Nazwa choroby"
                                    onChange={(event) => handleNameChange(event, index)} 
                                    variant="outlined" value={elem.diseaseName}
                                    error={errors.length !== 0 && !!errors[index].errors.diseaseName}
                                    helperText={errors.length !== 0 && errors[index].errors.diseaseName}
                                /><br></br>
                                <TextField className="visit__firstInput" id="outlined-basic" name="name" label="Nazwa szczepionki"
                                    onChange={(event) => handleNameChange(event, index)} 
                                    variant="outlined" value={elem.name}
                                    error={errors.length !== 0 && !!errors[index].errors.name}
                                    helperText={errors.length !== 0 && errors[index].errors.name}
                                />
                                <TextField className="visit__secondInput" type="text" id="outlined-basic" label="Nr serii"
                                    name="series" variant="outlined" onChange={(event) => handleChangeNumber(event, index)} 
                                    value={elem.series}
                                    error={errors.length !== 0 && !!errors[index].errors.series}
                                    helperText={errors.length !== 0 && errors[index].errors.series}
                                /><br></br>
                            </Typography>
                        </ThemeProvider>
                    </div>
                    )})}
                </div>
        </div>
    )
})

export default AddOtherVaccinations;