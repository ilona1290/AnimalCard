import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pl';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { addMinutes } from 'date-fns';
import { yupResolver } from '@hookform/resolvers/yup';
import FormHelperText from '@mui/material/FormHelperText'
import * as Yup from 'yup';
import { postData } from "../../components/Services/AccessAPI";

import './NewVisitDialog.css';
import SessionManager from "../Auth/SessionManager";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  

function NewVisitDialog({ openDialog, setOpenDialog, dataToNewVisit, disabledTerms }){
    // const [valid, setValid] = React.useState(false)
    const [disabledRangesTime, setDisabledRangesTime] = React.useState([])
    const [visitType, setVisitType] = React.useState('');
    const [owner, setOwner] = React.useState(null);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedTime, setSelectedTime] = React.useState(null);
    const [selectedEndTime, setSelectedEndTime] = React.useState(null);
    const [minEndTime, setMinEndTime] = React.useState(null);
    const [visit, setVisit] = React.useState({
        vetId: SessionManager.getUserId(),
        visitType: "",
        customType: "",
        owner: "",
        patient: "",
        dateVisit: null,
        timeStartVisit: null,
        timeEndVisit: null,
        extraInfo: ""
    });
    const [errors, setErrors] = React.useState({ 
        visitType: "",
        owner: "",
        dateVisit: "",
    });

    const schema = Yup.object().shape({
        visitType: Yup.string()
            .required('Pole Rodzaj wizyty jest wymagane.'),
        // customType: Yup.string()
        //     .required('Pole Rodzaj wizyty jest wymagane.'),
        owner: Yup.string()
          .required('Pole Właściciel jest wymagane.'),
        patient: Yup.string()
            .required("Pole Pacject jest wymagane."),
        dateVisit : Yup.date()
          .required('Pole Data wizyty jest wymagane.'),
        timeStartVisit: Yup.date()
            .required("Pole Godzina rozpoczęcia wizyty jest wymagane."),
        timeEndVisit: Yup.string()
            .required("Pole Godzina zakończenia wizyty jest wymagane."),
      });

    const shouldDisableTime = (time) => {
        const hour = time.$d.getHours();
        const minute = time.$d.getMinutes();
        if (selectedDate) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const dateString = selectedDate.$d.toLocaleDateString('pl-PL', options).split('.').reverse().join('-'); // Konwertuj datę na format "YYYY-MM-DD"
            setDisabledRangesTime(disabledTerms[dateString])

            if (disabledTerms[dateString]) {
              for (let i = 0; i < disabledTerms[dateString].length; i++) {
                const { startHour, startMinute, endHour, endMinute } = disabledTerms[dateString][i];
                
                if (getFullyCoveredHours(disabledTerms[dateString]).includes(hour)) {
                    return true;
                }
                else if(hour === startHour && hour === endHour){
                    if(minute === 0) return false
                    else if(minute >= startMinute && minute < endMinute){
                        return true
                    }
                }
                else if(hour === startHour && hour !== endHour){
                    if(minute === 0) return false
                    else if(minute >= startMinute){
                        return true
                    }
                }
                else if(hour !== startHour && hour === endHour){
                    if(minute === 0) return false
                    else if(minute < endMinute){
                        return true
                    }
                }
              }
            }
          }
          return false;
        }
      const getFullyCoveredHours = (disabledRanges) => {
        const combinedRanges = [];

        // Połącz przedziały czasowe, które mają wspólne godziny
        disabledRanges.forEach((range) => {
          const { startHour, startMinute, endHour, endMinute } = range;

          let mergedRange = combinedRanges.find((mergedRange) => {
            return (
              mergedRange.endHour === startHour && mergedRange.endMinute === startMinute
            );
          });

          if (mergedRange) {
            mergedRange.endHour = endHour;
            mergedRange.endMinute = endMinute;
          } else {
            combinedRanges.push({
              startHour,
              startMinute,
              endHour,
              endMinute,
            });
          }
        });
        // Wygeneruj listę godzin w pełni pokrytych przez połączone przedziały czasowe
        const fullyCoveredHours = [];
      
        combinedRanges.forEach((range) => {
          const { startHour, startMinute, endHour, endMinute } = range;
      
          for (let hour = 0; hour <= 24; hour++) {
            if(hour > startHour && hour < endHour){
                fullyCoveredHours.push(hour);
            }
            if(hour === startHour && startMinute === 0 && hour !== endHour)
            {
                fullyCoveredHours.push(hour);
            }
          }
        });
        return fullyCoveredHours;
      }

    const setEndMaxTime = () => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const dateString = selectedDate.$d.toLocaleDateString('pl-PL', options).split('.').reverse().join('-'); // Konwertuj datę na format "YYYY-MM-DD"
        if (disabledTerms[dateString]) {
            const combinedRanges = [];

            // Połącz przedziały czasowe, które mają wspólne godziny
            disabledRangesTime.forEach((range) => {
            const { startHour, startMinute, endHour, endMinute } = range;

            let mergedRange = combinedRanges.find((mergedRange) => {
                return (
                mergedRange.endHour === startHour && mergedRange.endMinute === startMinute
                );
            });

            if (mergedRange) {
                mergedRange.endHour = endHour;
                mergedRange.endMinute = endMinute;
            } else {
                combinedRanges.push({
                startHour,
                startMinute,
                endHour,
                endMinute,
                });
            }
            });
            console.log(combinedRanges)
            for(let i = 0; i < combinedRanges.length - 1; i++){
                const { startHour, startMinute, endHour, endMinute } = combinedRanges[i];
                let actEndDate = new Date(selectedDate.$y, selectedDate.$M, selectedDate.$D, endHour, endMinute)
                let minEndDate = new Date(selectedDate.$y, selectedDate.$M, selectedDate.$D, selectedTime.$H, selectedTime.$m)
                if(actEndDate.getTime() === minEndDate.getTime()){
                    return dayjs().set('hour', combinedRanges[i + 1].startHour).set('minute', combinedRanges[i + 1].startMinute)
                }
            }
        }
        return dayjs().set('hour', 17).set('minute', 0)
    }

    const handleDateChange = async (date) => {
        setSelectedDate(date);
        validateDate("dateVisit", date)
        if(errors.hasOwnProperty('timeStartVisit')){
            errors.timeStartVisit = ""
        }
    };

    const validateDate = async(name, value) => {
        setVisit({
            ...visit,
            [name]: dayjs(value.$d.toISOString())
        });
        try {
            await schema.validateAt( [name], { [name]: dayjs(value.$d.toISOString()) });
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
          } catch (error) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
          }
    }

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        const newDate = dayjs(addMinutes(time.$d, 5));
        setMinEndTime(newDate);
        validateDate("timeStartVisit", time)
        if(errors.hasOwnProperty('timeEndVisit')){
            errors.timeEndVisit = ""
        }
    };

    const handleEndTimeChange = (time) => {
        setSelectedEndTime(time)
        validateDate("timeEndVisit", time)
    };

  const handleClose = () => {
    setOpenDialog(false)
  };


  const handleChangeVisitType = async (event) => {
    let name = event.target.name;
    let value = event.target.value
    setVisitType(event.target.value);
    if(value === "Inna" && errors.hasOwnProperty('customType')){
        errors.customType = ""
    }
    validateString(name, value)
  };

  const handleChangeOwner = async (event, value) => {
    let chosenOwner = dataToNewVisit.owners.filter((str) => str.fullName === value)
    // Żeby tablica obiektu też się przepisała to trzeba skopiować obiekt
    setOwner(...chosenOwner);
    if(errors.hasOwnProperty('patient')){
        errors.patient = ""
    }
    validateString("owner", value)
  };

  const handleChangeCustomType = (event) => {
        validateString(event.target.name, event.target.value)
  }

  const validateString = async(name, value) => {
    setVisit({
        ...visit,
        [name]: value
    });
    try {
        await schema.validateAt( [name], { [name]: value});
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      } catch (error) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
      }
}

  const handleChangePatient = async (event, value) => {
    validateString("patient", value)
  };

  const handleExtraInfo = (event) => {
    setVisit({
        ...visit,
        "extraInfo": event.target.value
    });
  }

  const animateButton = (e) => {
    schema
      .validate(visit, { abortEarly: false })
      .then(() => {
        e.target.innerText = ""
        e.preventDefault();
        e.target.classList.remove('animate');
        e.target.classList.remove('success');
        
        e.target.classList.add("circle")
        e.target.classList.add('animate');
        let visitToSent = {
            vet: SessionManager.getUserId(),
            visitType: "",
            customType: "",
            owner: "",
            patient: "",
            dateVisit: null,
            timeStartVisit: null,
            timeEndVisit: null,
            extraInfo: ""
        };

        visitToSent.visitType = dataToNewVisit.visitTypes.filter((str) => str.name === visit.visitType)[0].id;
        visitToSent.customType = visit.customType;
        visitToSent.owner = dataToNewVisit.owners.filter((str) => str.fullName === visit.owner)[0].id;
        let ownerIndex = dataToNewVisit.owners.findIndex(x => x.fullName === visit.owner)
        visitToSent.patient = dataToNewVisit.owners[ownerIndex].pets.filter((str) => str.name === visit.patient)[0].id;
        visitToSent.dateVisit = visit.dateVisit.$d
        visitToSent.timeStartVisit = visit.timeStartVisit.$d
        visitToSent.timeEndVisit = visit.timeEndVisit.$d
        visitToSent.extraInfo = visit.extraInfo
        postData('api/Visit/AddNewVisit', visitToSent).then((result) => {
            e.target.classList.remove('animate');
            if(result === true){
                e.target.classList.add('success');
                setTimeout(function(){
                    setOpenDialog(false)
                    window.location.reload();
                },500);
            }
        })
        // Perform form submission logic here
      })
      .catch((validationErrors) => {
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
        console.error('Form validation errors:', errors);
      });
    
  };

  return (
    <div >
      {/* <button className="header__buttons__end__btn vetCalendar__btn__startVisit__newVisit" onClick={handleClickOpen}>
      Zaplanuj wizytę
      </button> */}
      <ThemeProvider theme={theme}>
                        <Typography component={'span'} variant={'body2'}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Nowa Wizyta
        </BootstrapDialogTitle>
        <DialogContent dividers >
        <FormControl fullWidth required error={!!errors.visitType}>
        <InputLabel id="demo-simple-select-label">Rodzaj wizyty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={visitType}
          name="visitType"
          sx={{ width: 400}}
          label="Rodzaj wizyty"
          onChange={handleChangeVisitType}
        >
            {dataToNewVisit.visitTypes.map((visitTypeElem, index) => {
                return(
                    <MenuItem value={visitTypeElem.name}>{visitTypeElem.name}</MenuItem>
                );
            })}
        </Select>
        <FormHelperText className="visit__firstInput">{errors.visitType}</FormHelperText>
      </FormControl>
      {visitType === "Inna" && 
        <TextField className="visit__firstInput" sx={{ width: 300}} 
            id="outlined-basic" name="customType" label="Rodzaj wizyty" 
            variant="outlined" 
            onChange={(event) => handleChangeCustomType(event)}
            required
            error={!!errors.customType}
            helperText={errors.customType}
        />}
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dataToNewVisit.owners.map(a => a.fullName)}
            sx={{ width: 400}}
            className="visit__firstInput"
            name="owner"
            // renderInput={(params) => <TextField {...params} label="Właściciel" />}
            onChange={(e, value) => handleChangeOwner(e, value)}
            ListboxProps={
                {
                  style:{
                      maxHeight: '300px',
                  }
                }
              }
              renderInput={(params) =>
                <TextField
                    {...params}
                    label="Właściciel"
                    required
                    error={!!errors.owner}
                    helperText={errors.owner}
                />}
        ></Autocomplete>
        {owner !== null && typeof owner !== "undefined" ?
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={owner !== null && typeof owner !== "undefined" ? owner.pets.map(a => a.name) : []}
            sx={{ width: 400}}
            name="patient"
            onChange={(e, value) => handleChangePatient(e, value)}
            className="visit__firstInput"
            renderInput={(params) =>
                <TextField
                    {...params}
                    label="Pacjent"
                    required
                    error={!!errors.patient}
                    helperText={errors.patient}
                />}
            ListboxProps={
                {
                  style:{
                      maxHeight: '300px',
                  }
                }
              }
        ></Autocomplete>: <div></div>}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <DatePicker sx={{marginBottom: "0.6em", width: 400}} 
                label="Data wizyty" disablePast value={selectedDate} 
                onChange={handleDateChange}
                required
                slotProps={{
                    textField: {
                        readOnly: true,
                        helperText: errors.dateVisit,
                        error: errors.dateVisit,
                    }
                }}
            />
        </LocalizationProvider>
        
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <DemoContainer components={['TimePicker']}>
            {selectedDate && (
                <TimePicker sx={{marginBottom: "0.6em", width: 400}} 
                    label="Godzina rozpoczęcia wizyty" 
                    value={selectedTime} 
                    minTime={dayjs().set('hour', 8).set('minute', 0)}
                    maxTime={dayjs().set('hour', 17).set('minute', 0)}
                    shouldDisableTime={shouldDisableTime} 
                    onChange={handleTimeChange}
                    required
                    slotProps={{
                        textField: {
                            readOnly: true,
                            helperText: errors.timeStartVisit,
                            error: errors.timeStartVisit
                        }
                    }}
                />
            )}</DemoContainer>
        </LocalizationProvider>
        {selectedTime && (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <DemoContainer components={['TimePicker']}>
                <TimePicker sx={{marginBottom: "0.6em", width: 400}} 
                    label="Godzina zakończenia wizyty" 
                    minTime={minEndTime}
                    maxTime={setEndMaxTime()}
                    value={selectedEndTime}
                    onChange={handleEndTimeChange}
                    required
                    slotProps={{
                        textField: {
                            readOnly: true,
                            helperText: errors.timeEndVisit,
                            error: errors.timeEndVisit
                        }
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>)}
        <TextField
            id="outlined-multiline-static"
            label="Dodatkowe informacje"
            multiline
            onChange={handleExtraInfo}
            rows={4}
            style={{width: 400, padding: "1em 0em !important", marginTop: "0.6em"}}
        />
        </DialogContent>
        <DialogActions>
          <button className="addVisit__btn" onClick={animateButton}>
            Zaplanuj wizytę
          </button>
        </DialogActions>
      </BootstrapDialog>
      </Typography>
      </ThemeProvider>
    </div>
  );
}

export default NewVisitDialog;