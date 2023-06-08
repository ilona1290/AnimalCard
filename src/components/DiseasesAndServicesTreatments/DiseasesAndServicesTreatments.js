import React from "react";

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function DiseasesAndServicesTreatments({chosen, label, optionsToShow, handleChange}){
    console.log(chosen)
    return(
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={optionsToShow}
            // musi być e tu w parametrze, bo inaczej pod value wejdzie nam event
            onChange={(e, value) => handleChange(value)}
            value={chosen}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                />
                {option}
                </li>
            )}
            style={{ width: "90%", marginLeft: "5%" }}
            renderInput={(params) => (
                <TextField {...params} label={label}/>
            )}
        />
    );
}

export default DiseasesAndServicesTreatments;