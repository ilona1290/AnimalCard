import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pl';

import "./StartVisit.css";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

  let isRemoving = false;
  let nodeId = 0;

function StartVisit(){
    const [num, setNum] = useState("");
    const [rabiesVaccinations, setrabiesVaccinations] = useState([]);
    const [isToggle, setToggle] = useState(false);
    const arrowRef = React.useRef(null)

    const handleChangeNumber = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
        setNum(e.target.value);
        }
    };

    const handleAddNewItem = () => {
        setToggle(false)
        isRemoving = false
        let newfield = {id: nodeId++, name: '', series: "", date1: "", date2: ""}
        setrabiesVaccinations([...rabiesVaccinations, newfield])
        if(rabiesVaccinations.length === 0){
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
            let copy = [...rabiesVaccinations]
            copy.splice(index, 1)
            setrabiesVaccinations(copy)
            // Aby następnemu elementowi nie ustawiła się animacja wyjścia!!!!!!!!!!!!!!!!!!!!!!!!!!
            element.className = "visit__form"
        }, 700)
    }

    const handleNameChange = (event, index) => {
        let data = [...rabiesVaccinations];
        data[index][event.target.name] = event.target.value;
        setrabiesVaccinations(data);
    }

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

    return(
        <div>
            <Link to="/logout">
                <button className="header__buttons__end__btn">
                    <p>Wyloguj</p>
                </button>
            </Link>
            <Link to="/vetMenu/calendar">
                <button className="header__buttons__end__btn">
                    <p>Powrót</p>
                </button>
            </Link>

            <div className="visit__element">
                <div className={rabiesVaccinations.length === 0 ? "displayNone__div" : ""}><span ref={arrowRef} className="arrow" onClick={toggleArrow}><span></span><span></span></span></div>
                Szczepienia przeciwko wściekliźnie
                <button className="visit__addNewItem" onClick={handleAddNewItem}>
                    +
                    <span className="tooltiptext">Dodaj szczepienie</span>
                </button>
            </div>
            <div className="visit__container__form">
                {rabiesVaccinations.map((elem, index) => {
                    return (
                <div className={`visit__form  ${index === rabiesVaccinations.length - 1 && isRemoving === false && isToggle === false ? "animateIn" : ""}`} id={`elem-${elem.id}`}>
                    <ThemeProvider theme={theme}>
                        <Typography component={'span'} variant={'body2'}>
                            <button className="visit__removeItem" onClick={() => removeNewItem(index, elem.id)}>
                                x
                                <span className="tooltiptext">Usuń szczepienie</span>
                            </button>
                            <TextField className="visit__firstInput" id="outlined-basic" name="name" label="Nazwa szczepionki" onChange={(event) => handleNameChange(event, index)} variant="outlined" value={elem.name}/>
                            <TextField type="text" id="outlined-basic" label="Nr serii" variant="outlined" onChange={(e) => handleChangeNumber(e)} value={num}/><br></br>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                                <DatePicker className="visit__dateField" label="Data ważności szczepionki"/>
                            </LocalizationProvider><br></br>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                                <DatePicker className="visit__dateField" label="Termin następnego szczepienia"/>
                            </LocalizationProvider>
                        </Typography>
                    </ThemeProvider>
                </div>
                )})}
            </div>
            <div className="visit__element">Choroby</div>
            <div className="visit__element">Zabiegi</div>
            <div className="visit__element">Badania</div>
            <div className="visit__element">Waga</div>
        </div>
    )
}

export default StartVisit;