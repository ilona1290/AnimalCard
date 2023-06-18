import React from "react";

import TextField from '@mui/material/TextField';

function CustomDiseasesAndServicesTreatments({name, placeholder, addFields, customArray, handleChange, handleRemove}) {
    return(
        <div>
            <button className="form__addMore" onClick={addFields}>Dodaj kolejną pozycję</button>
            {customArray.map((input, index) => {
          return (
            <div key={index}>
              <button className="header__buttons__end__btn" style={{backgroundColor: "red"}} onClick={() => handleRemove(index)}>Usuń</button><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} name={name} value={input} label={placeholder} variant="outlined" 
              onChange={event => handleChange(index, event)} /> <br></br><br></br>
            </div>)})}
        </div>
    );
}

export default CustomDiseasesAndServicesTreatments;