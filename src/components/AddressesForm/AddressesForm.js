import React from "react";

import TextField from '@mui/material/TextField';

import './AddressesForm.css';

function AddressesForm({addFields, addressesArray, handleChange, handleRemove}){
  console.log(addressesArray)
    return(
        <div>
            <button className="form__addMore" onClick={addFields}>Dodaj kolejny adres</button>
            {addressesArray.map((input, index) => {
          return (
            <div key={index}>
                <button className="header__buttons__end__btn" style={{backgroundColor: "red"}} onClick={() => handleRemove(index)}>Usuń</button><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} value={input.nameOfPlace === null ? '' : input.nameOfPlace} name="nameOfPlace" label="Nazwa placówki" variant="outlined" onChange={event => handleChange(index, event)} InputLabelProps={{shrink: true,}}/> <br></br><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} value={input.city} name="city" label="Miasto" variant="outlined" onChange={event => handleChange(index, event)} InputLabelProps={{shrink: true,}}/> <br></br><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} value={input.district === null ? '' : input.district} name="district" label="Dzielnica" variant="outlined" onChange={event => handleChange(index, event)} InputLabelProps={{shrink: true,}}/> <br></br><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} value={input.street} name="street" label="Ulica" variant="outlined" onChange={event => handleChange(index, event)} InputLabelProps={{shrink: true,}}/> <br></br><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} value={input.houseNumber} name="houseNumber" label="Numer domu" variant="outlined" onChange={event => handleChange(index, event)} InputLabelProps={{shrink: true,}}/> <br></br><br></br>
              <TextField id="outlined-basic" style={{width: "70%"}} value={input.premisesNumber === null ? '' : input.premisesNumber} name="premisesNumber" label="Numer lokalu" variant="outlined" onChange={event => handleChange(index, event)} InputLabelProps={{shrink: true,}}/> <br></br><br></br>
            </div>)})}
        </div>
    );
}

export default AddressesForm;