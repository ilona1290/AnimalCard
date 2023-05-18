import React from "react";
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

import './NewVisitDialog.css';

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

function NewVisitDialog({ openDialog, setOpenDialog }){
    // const [open, setOpen] = React.useState(false);
    const [pets, setPets] = React.useState(["Astro", "Balto", "Barney", "Barry", "Beethoven", "Benji", "Kieł", "Boo", "Boss", "Bruiser", "Chojrak", 
    "Cywil", "Droopy", "Dżok", "Eddie", "Goofy", "Fala", "Happy", "Hooch"]);
    const [visitType, setVisitType] = React.useState('');

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpenDialog(false)
  };


  const handleChangeVisitType = (event) => {
    setVisitType(event.target.value);
  };


  const animateButton = (e) => {

    e.preventDefault();
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    
    e.target.classList.add('animate');
    
    setTimeout(function(){
      setOpenDialog(false)
      
      },3200);
    setTimeout(function(){
      e.target.classList.remove('animate');
    
    },4000);
    
  };

  return (
    <div style={{height: "100%"}}>
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
        <DialogContent dividers>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Rodzaj wizyty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={visitType}
          label="Rodzaj wizyty"
          className="visit__firstInput"
          onChange={handleChangeVisitType}
        >
            <MenuItem value={"Wizyta kontrolna"}>Wizyta kontrolna</MenuItem>
            <MenuItem value={"Szczepienie"}>Szczepienie</MenuItem>
            <MenuItem value={"Zabieg"}>Zabieg</MenuItem>
            <MenuItem value={"Badanie"}>Badanie</MenuItem>
            <MenuItem value={"Inna"}>Inna</MenuItem>
        </Select>
      </FormControl>
      {visitType === "Inna" && <TextField className="visit__firstInput" id="outlined-basic" name="name" label="Rodzaj wizyty" variant="outlined" />}
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={pets}
            sx={{ width: 300}}
            className="visit__firstInput"
            renderInput={(params) => <TextField {...params} label="Pacjent" />}
            ListboxProps={
                {
                  style:{
                      maxHeight: '300px',
                  }
                }
              }
        ></Autocomplete>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <DatePicker sx={{marginBottom: "0.6em"}} label="Data wizyty"/>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <DemoContainer components={['TimePicker']}>
                <TimePicker sx={{marginBottom: "1em"}} label="Godzina wizyty" />
            </DemoContainer>
        </LocalizationProvider>
        <TextField
            id="outlined-multiline-static"
            label="Dodatkowe informacje"
            multiline
            rows={4}
            style={{width: "95%", padding: "1em 0em !important"}}
        />
        </DialogContent>
        <DialogActions>
          <button className="addVisit__btn success" onClick={animateButton}>
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