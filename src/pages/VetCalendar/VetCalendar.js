import React from "react";
import { Link } from 'react-router-dom';
import NewVisitDialog from "../../components/NewVisitDialog";
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent.tsx";
import { indigo, blue, teal } from "@mui/material/colors";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import './VetCalendar.css'

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

// do zewnętrznego - kafelki w kalendarzu
const appointments = [
    {
        title: "Szczepienie",
        startDate: new Date(2023, 4, 11, 9, 0),
        endDate: new Date(2023, 4, 11, 9, 30),
        priority: 2,
        location: "Room 3",
        patient: "Fifi",
        owner: "Elwira Kwiatkowska"
    },
    {
        title: "Wizyta kontrolna",
        startDate: new Date(2023, 4, 11, 9, 30),
        endDate: new Date(2023, 4, 11, 10, 0),
        priority: 1,
        location: "Room 1",
        patient: "Mark",
        owner: "Julian Sokołowski"
    },
    {
        title: "Zabieg",
        startDate: new Date(2023, 4, 11, 10, 15),
        endDate: new Date(2023, 4, 11, 11, 30),
        priority: 1,
        location: "Room 3",
        patient: "Borys",
        owner: "Adrianna Szewczyk"
    },
    {
        title: "Zabieg",
        startDate: new Date(2023, 4, 12, 10, 15),
        endDate: new Date(2023, 4, 12, 13, 0),
        priority: 3,
        location: "Room 2",
        patient: "Bethoveen",
        owner: "Kryspin Błaszczyk"
    },
    {
        title: "Badanie",
        startDate: new Date(2023, 4, 8, 11, 0),
        endDate: new Date(2023, 4, 8, 12, 0),
        priority: 2,
        location: "Room 3",
        patient: "Barry",
        owner: "Kornel Lewandowski"
    },
    {
        title: "Szczepienie",
        startDate: new Date(2023, 4, 8, 12, 30),
        endDate: new Date(2023, 4, 8, 13, 0),
        priority: 1,
        location: "Room 1",
        patient: "Barry",
        owner: "Krystyna Wojciechowska"
    },
    {
        title: "Zabieg",
        startDate: new Date(2023, 4, 8, 8, 0),
        endDate: new Date(2023, 4, 8, 9, 0),
        priority: 3,
        location: "Room 1",
        patient: "Simon",
        owner: "Łucja Michalak"
    },
    {
        title: "Zabieg",
        startDate: new Date(2023, 4, 9, 9, 30),
        endDate: new Date(2023, 4, 9, 11, 0),
        priority: 3,
        location: "Room 3",
        patient: "Koba",
        owner: "Gabriel Duda"
    },
    {
        title: "Wizyta kontrolna",
        startDate: new Date(2023, 4, 10, 8, 0),
        endDate: new Date(2023, 4, 10, 8, 45),
        priority: 2,
        patient: "Barry",
        owner: "Józefa Kaźmierczak"
    },
    {
        title: "Zabieg",
        startDate: new Date(2023, 4, 10, 12, 0),
        endDate: new Date(2023, 4, 10, 13, 45),
        priority: 1,
        patient: "Fifi",
        owner: "Bartłomiej Szewczyk"
    }
  ];

  //do zewnętrznego, definicja informacji, które są w kafelku
const resources = [
    // {
    //     fieldName: "location",
    //     title: "Location",
    //     instances: [
    //         { id: "Room 1", text: "Room 1", color: indigo },
    //         { id: "Room 2", text: "Room 2", color: blue },
    //         { id: "Room 3", text: "Room 3", color: teal }
    //     ]
    // },
    // {
    //     fieldName: "priority",
    //     title: "Priority",
    //     instances: [
    //         { id: 1, text: "High Priority", color: teal },
    //         { id: 2, text: "Medium Priority", color: blue },
    //         { id: 3, text: "Low Priority", color: indigo }
    //     ]
    // },
    {
        fieldName: "patient",
        title: "Pacjent",
        instances: []
    },
    {
        fieldName: "owner",
        title: "Właściciel",
        instances: []
    }
];

function VetCalendar(){
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false)
    const open = Boolean(anchorEl);

    const handleClickOpen = () => {
        setOpenDialog(true);
        setAnchorEl(null);
    };

    const handleStartVisit = () => {
        navigate("/vetMenu/calendar/startVisit")
    }

    const handleBack = () => {
        navigate("/vetMenu")
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <div>
            <NewVisitDialog openDialog={openDialog} setOpenDialog={setOpenDialog}/>
            {/* <Link to="/vetMenu/calendar/startVisit">
                <div className="header__buttons__end__btn" style={{position: "absolute", right: "29em", top: "3.5em", fontSize: "1.6rem", fontFamily: "Arial"}}>Zaplanuj wizytę</div>
            </Link> */}
            <ThemeProvider theme={theme}>
                <Typography component={'span'} variant={'body2'}>
                  <Button
                  className="options__btn"
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        
      >Opcje</Button>
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClickOpen}>Zaplanuj wizytę</MenuItem>
        <MenuItem onClick={handleStartVisit}>Rozpocznij nieumówioną wizytę</MenuItem>
        <MenuItem onClick={handleBack}>Powrót</MenuItem>
      </Menu>
      </Typography>
      </ThemeProvider>
            <CalendarComponent appointments={appointments} resources={resources} who="vet" />
        </div>
    );
}

export default VetCalendar;