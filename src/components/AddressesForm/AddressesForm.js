import React from "react";

import TextField from '@mui/material/TextField';

import './AddressesForm.css';

function AddressesForm({addFields, addressesArray, handleChange}){
    return(
        <div>
            <button className="form__addMore" onClick={addFields}>Dodaj kolejny adres</button>
            {addressesArray.map((input, index) => {
          return (
            <div key={index}>
              <TextField id="outlined-basic" style={{width: "70%"}} name="nameOfPlace" label="Nazwa placówki" variant="outlined" onChange={event => handleChange(index, event)} /> <br></br><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} name="city" label="Miasto" variant="outlined" onChange={event => handleChange(index, event)} /> <br></br><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} name="district" label="Dzielnica" variant="outlined" onChange={event => handleChange(index, event)} /> <br></br><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} name="street" label="Ulica" variant="outlined" onChange={event => handleChange(index, event)} /> <br></br><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} name="houseNumber" label="Numer domu" variant="outlined" onChange={event => handleChange(index, event)} /> <br></br><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} name="premisesNumber" label="Numer lokalu" variant="outlined" onChange={event => handleChange(index, event)} /> <br></br><br></br>
            </div>)})}
        </div>
    );
}

export default AddressesForm;