import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import './AddWeight.css'

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

  let nodeId = 0;
  let isRemoving = false;
function AddWeight({weight, onWeightChanged }){
    const [addedWeight, setAddedWeight] = useState(weight)
    const [isToggle, setToggle] = useState(false);
    const arrowRef = React.useRef(null)

    const toggleArrow = (event) => {
        setToggle(true);
        // toggle class w React'ie 
        event.target.classList.toggle('active');
        if(event.target.className === "addWeight__arrow"){
            let element = document.getElementsByClassName('addWeight__visit__container__form')[0]
            element.className = "addWeight__visit__container__form animateOut";
            setTimeout(function() {
                element.className = "addWeight__displayNone__div"
            }, 700)
        }
        else{
            let element = document.getElementsByClassName('addWeight__displayNone__div')[0]
            element.className = "addWeight__visit__container__form addWeight__displayBlock__div animateIn";
        }
    }

    const handleAddNewItem = () => {
        setToggle(false)
        isRemoving = false
        let newfield = {id: nodeId++, weightValue: ""}
        setAddedWeight([...addedWeight, newfield])
        onWeightChanged(addedWeight)
        if(addedWeight.length === 0){
            let elem = document.getElementsByClassName("addWeight__arrow")
            elem[0].className = "addWeight__arrow active"
        }
        if(arrowRef.current != null && arrowRef.current.className === "addWeight__arrow"){
            arrowRef.current.click();
        }
        let button = document.getElementsByClassName("addWeight__visit__addNewItem")
        button[0].style.visibility = "hidden"
    }

    const removeNewItem = (index, elemId) => {
        let element = document.getElementById(`addWeight__elem-${elemId}`)
        element.className = "addWeight__visit__form animateOut"
        isRemoving = true;

        
        setTimeout(function() {
            let copy = [...addedWeight]
            copy.splice(index, 1)
            setAddedWeight(copy)
            onWeightChanged(copy)
            // Aby następnemu elementowi nie ustawiła się animacja wyjścia!!!!!!!!!!!!!!!!!!!!!!!!!!
            element.className = "addWeight__visit__form"
        }, 700)
        let button = document.getElementsByClassName("addWeight__visit__addNewItem")
        button[0].style.visibility = "visible"
    }

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        if(isNaN(value)) return;
        else{
            let data = [...addedWeight];
            data[index][name] = value;
            setAddedWeight(data);
            onWeightChanged(data)
        }
    }


    return(
        <div>
            <div className="addWeight__visit__element">
                    <div className={addedWeight.length === 0 ? "addWeight__displayNone__div" : ""}><span ref={arrowRef} className="addWeight__arrow" onClick={toggleArrow}><span></span><span></span></span></div>
                    Waga
                    <button className="addWeight__visit__addNewItem" style={{visibility: addedWeight.length === 0 ? "visible": "hidden"}} onClick={handleAddNewItem}>
                        +
                        <span className="addWeight__tooltiptext">Dodaj wagę</span>
                    </button>
                </div>
                <div className="addWeight__visit__container__form">
                    {addedWeight.map((elem, index) => {
                        return (
                    <div className={`addWeight__visit__form  ${index === addedWeight.length - 1 && isRemoving === false && isToggle === false ? "animateIn" : ""}`} id={`addWeight__elem-${elem.id}`}>
                        <ThemeProvider theme={theme}>
                            <Typography component={'span'} variant={'body2'}>
                                <button className="addWeight__visit__removeItem" onClick={() => removeNewItem(index, elem.id)}>
                                    x
                                    <span className="addWeight__tooltiptext">Usuń wagę</span>
                                </button>
                                <TextField className="visit__secondInput" type="text" id="outlined-basic" label="Waga"
                                    name="weightValue" variant="outlined" onChange={(event) => handleChange(event, index)} 
                                    value={elem.weightValue}
                                />
                            </Typography>
                        </ThemeProvider>
                    </div>
                    )})}
                </div>
        </div>
    )
}

export default AddWeight