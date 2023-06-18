import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import SessionManager from "../Auth/SessionManager";
import { putData } from "../Services/AccessAPI";

const theme = createTheme({
    typography: {
    // Tell MUI what's the font-size on the html element is.
    htmlFontSize: 10,
    },
});

function ChangeContactData({ contactData }){
    const [data, setData] = React.useState(contactData)
    const [errors, setErrors] = React.useState({ 
        email: "",
        phoneNumber: ""
    });

    const schema = Yup.object().shape({
        email: Yup.string()
            .required('Pole Email jest wymagane.'),
        // customType: Yup.string()
        //     .required('Pole Rodzaj wizyty jest wymagane.'),
        phoneNumber: Yup.string()
          .required('Pole Nr telefonu jest wymagane.')
      });

    const handleChange = async(event) => {
        const { name, value } = event.target;
        if(name === "phoneNumber"){
            if(isNaN(value)) return;
            else{
                setData({
                    ...data,
                    "phoneNumber": value
                });
            }
        }else{
            setData({
                ...data,
                [name]: value
            });
        }
        try {
            await schema.validateAt([name], { [name]: value});
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        } catch (error) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
        }
    }

    const handleSave = () => {
        schema
        .validate(data, { abortEarly: false })
        .then(() => {
            let dataToSend = {
                who: SessionManager.getRole(),
                id: Number(SessionManager.getUserId()),
                email: data.email,
                phoneNumber: data.phoneNumber
            }
            putData('api/User/UpdateContact', dataToSend).then((result) => {
                if(result === true){
                    window.location.reload()
                }
            });
      })
      .catch((validationErrors) => {
        const errors = {};

        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });

        setErrors(errors);
        console.error('Form validation errors:', errors);
      });
    }
    return(
        <div>
            <ThemeProvider theme={theme}>
                <Typography component={'span'} variant={'body2'}>
                    <TextField className="visit__secondInput" id="outlined-basic" name="email" label="Email"
                        onChange={handleChange} 
                        variant="outlined" value={data.email}
                        sx={{ width: 400}}
                        error={!!errors.email}
                        helperText={errors.email}
                    /><br></br>
                    <TextField className="visit__secondInput" type="text" id="outlined-basic" label="Nr telefonu"
                        name="phoneNumber" variant="outlined" onChange={handleChange}
                        sx={{ width: 400}}
                        value={data.phoneNumber}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                    /><br></br>
                    <button className="save__btn" onClick={handleSave}>Zapisz</button>
                </Typography>
            </ThemeProvider>
        </div>
    )
}

export default ChangeContactData;