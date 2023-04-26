import React from "react";

import TextField from '@mui/material/TextField';

function CustomDiseasesAndServicesTreatments({name, placeholder, addFields, customArray, handleChange}) {
    return(
        <div>
            <button className="form__addMore" onClick={addFields}>Dodaj kolejną pozycję</button>
            {customArray.map((input, index) => {
          return (
            <div key={index}>
              <TextField id="outlined-basic" style={{width: "70%"}} name={name} label={placeholder} variant="outlined" onChange={event => handleChange(index, event)} /> <br></br><br></br>
            </div>)})}
            
        </div>
    );
}

export default CustomDiseasesAndServicesTreatments;