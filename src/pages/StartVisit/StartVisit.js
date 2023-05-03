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
import PreviewVisit from "../../components/PreviewVisit/PreviewVisit";

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
    const [showPreview, setShowPreview] = useState(false);

    const [rabiesVaccinations, setrabiesVaccinations] = useState([]);
    // const [infectiousDiseaseVaccinations, setInfectiousDiseaseVaccinations] = useState([]);
    // const [diseases, setDiseases] = useState([]);
    // const [treatments, setTreatments] = useState([]);
    // const [researches, setResearches] = useState([]);
    // const [weight, setWeight] = useState([]);

    const [isToggle, setToggle] = useState(false);
    const arrowRef = React.useRef(null)

    const handleShowPreview = () => {
        setShowPreview(!showPreview)
    }

    const handleChangeNumber = (event, index) => {
        const regex = /^[0-9\b]+$/;
        if (event.target.value === "" || regex.test(event.target.value)) {
            let data = [...rabiesVaccinations];
            data[index][event.target.name] = event.target.value;
            setrabiesVaccinations(data);
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

    const handleNameChange = (event, index, date) => {
        let data = [...rabiesVaccinations];
        if(typeof date === "undefined"){
            data[index][event.target.name] = event.target.value;
        }
        else{
            data[index][date] = event.$d.toLocaleDateString();;
        }
        
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
        <div style={{paddingTop: "7%"}}>
            {showPreview === true ? <PreviewVisit handleShowPreview={handleShowPreview} rabiesVaccinations={rabiesVaccinations} /> : <div>
                <Link to="/vetMenu/calendar">
                    <button className="header__buttons__end__btn" style={{position: "absolute", right: "6em", top: "3.5em"}}>
                        <p>Powrót</p>
                    </button>
                </Link>
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "15em", top: "3.5em"}} onClick={handleShowPreview}>
                    <p>Zakończ wizytę</p>
                </button>
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
                                <TextField type="text" id="outlined-basic" label="Nr serii" name="series" variant="outlined" onChange={(event) => handleChangeNumber(event, index)} value={elem.series}/><br></br>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                                    <DatePicker className="visit__dateField" name="date1" label="Data ważności szczepionki" onChange={(event) => handleNameChange(event, index, 'date1')}/>
                                </LocalizationProvider><br></br>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                                    <DatePicker className="visit__dateField" name="date2" label="Termin następnego szczepienia" onChange={(event) => handleNameChange(event, index, 'date2')}/>
                                </LocalizationProvider>
                            </Typography>
                        </ThemeProvider>
                    </div>
                    )})}
                </div>
                <div className="visit__element">Szczepienia przeciwko innym chorobom zakaźnym</div>
                <div className="visit__element">Choroby</div>
                <div className="visit__element">Zabiegi</div>
                <div className="visit__element">Badania</div>
                <div className="visit__element">Waga</div>
            </div>}
        </div>
    )
}

export default StartVisit;