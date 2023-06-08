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
import { getData } from "../../components/Services/AccessAPI";
import SessionManager from "../../components/Auth/SessionManager";

import './VetCalendar.css'
import Loader from "../../components/Loader";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });


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
    const [dataToNewVisit, setDataToNewVisit] = React.useState(null)
    const [isLoading, setLoading] = React.useState(true);
    const [disabledTermsFromAPI, setDisabledTermsFromAPI] = React.useState([])
    const open = Boolean(anchorEl);
    // let disabledTerms = {}
    const [disabledTerms, setDisabledTerms] = React.useState({})
    const [scheduledVisitsFromAPI, setScheduledVisitsFromAPI] = React.useState([])
    const [scheduledVisits, setScheduledVisits] = React.useState([{
        id: "",
        visitTypeId: "",
        title: "",
        startDate: "",
        endDate: "",
        patient: "",
        owner: "",
        isCompleted: ""
    }]);


    React.useEffect(() => {
        getData(`api/Visit/GetDataToNewVisit/${SessionManager.getUserId()}`).then((result) => {
            setDataToNewVisit(result);
            setDisabledTermsFromAPI(result.disabledTerms)
            getData(`api/Visit/${SessionManager.getUserId()}/GetVetScheduledVisits`).then((result) => {
                setScheduledVisitsFromAPI(result.scheduledVisits);
                setLoading(false)
            })
        })

        
        
        if(disabledTermsFromAPI.length !== 0 && scheduledVisitsFromAPI.length !== 0){
            
            prepareDisabledTerms()
            prepareScheduledVisits()
        }
        
    }, [isLoading])
    

    const prepareScheduledVisits = () => {
        const data = scheduledVisitsFromAPI.map(obj => {
            const { id, visitTypeId, visitTypeName, startDate, endDate, patient, owner, isCompleted, extraInfo } = obj; // Wybierz potrzebne właściwości obiektu z pierwszej tablicy
            return { id, visitTypeId, title: visitTypeName, startDate, endDate, patient, owner, isCompleted, extraInfo }; // Utwórz nowy obiekt z wybranymi właściwościami
          });
        setScheduledVisits(data)
    }

    const prepareDisabledTerms = () => {
        disabledTermsFromAPI.forEach((interval) => {
            const date = interval.startDate.split('T')[0]; // Pobierz datę z formatu "YYYY-MM-DD"
            if (!disabledTerms[date]) {
                disabledTerms[date] = []; // Utwórz pustą tablicę dla danej daty, jeśli jeszcze nie istnieje
            }
            let rrr = new Date(interval.startDate)
            disabledTerms[date].push({
              startHour: new Date(interval.startDate).getHours(),
              startMinute: new Date(interval.startDate).getMinutes(),
              endHour: new Date(interval.endDate).getHours(),
              endMinute: new Date(interval.endDate).getMinutes(),
            });
        });
        // Aby w komponencie dziecka obiekt nie był nullem to po stronie rodzica musi być utworzony jako stan.
        setDisabledTerms(disabledTerms)
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
        setAnchorEl(null);
    };

    const handleStartVisit = () => {
        navigate("/vetMenu/calendar/startVisit/0/type/0")
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
            {isLoading && <Loader />}
            {!isLoading && <div>
            <NewVisitDialog openDialog={openDialog} setOpenDialog={setOpenDialog} dataToNewVisit={dataToNewVisit} disabledTerms={disabledTerms} />
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
            <CalendarComponent appointments={scheduledVisits} resources={resources} who="vet" />
        </div>}
        </div>
    );
}

export default VetCalendar;