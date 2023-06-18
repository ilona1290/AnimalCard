import React from "react";

import { Link, useNavigate } from 'react-router-dom';
import { styled, alpha } from "@mui/material/styles";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
  Resources,
  AppointmentTooltip
} from "@devexpress/dx-react-scheduler-material-ui";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { indigo, blue, teal } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import classNames from "clsx";
import Room from "@mui/icons-material/Room";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import './CalendarComponent.css'

import OwnerIcon from './ownerIcon4.png'
import PetIcon from './petIcon.png'
import VetIcon from './vetIcon.png'
import InfoIcon from './info.png'
import { deleteData } from "../Services/AccessAPI";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    }
  });

const PREFIX = "Demo";

const classes = {
  appointment: `${PREFIX}-appointment`,
  highPriorityAppointment: `${PREFIX}-highPriorityAppointment`,
  mediumPriorityAppointment: `${PREFIX}-mediumPriorityAppointment`,
  lowPriorityAppointment: `${PREFIX}-lowPriorityAppointment`,
  weekEndCell: `${PREFIX}-weekEndCell`,
  weekEndDayScaleCell: `${PREFIX}-weekEndDayScaleCell`,
  text: `${PREFIX}-text`,
  content: `${PREFIX}-content`,
  container: `${PREFIX}-container`,
  textCenter: `${PREFIX}-textCenter`,
  icon: `${PREFIX}-icon`,
};

const StyledMonthViewDayScaleCell = styled(MonthView.DayScaleCell)(
  ({ theme: { palette } }) => ({
    [`&.${classes.weekEndDayScaleCell}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.06)
    }
  })
);

const StyledMonthViewTimeTableCell = styled(MonthView.TimeTableCell)(
  ({ theme: { palette } }) => ({
    [`&.${classes.weekEndCell}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      "&:hover": {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04)
      },
      "&:focus": {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04)
      }
    }
  })
);

const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
  [`&.${classes.appointment}`]: {
    borderRadius: 0,
    borderBottom: 0
  },
  [`&.${classes.highPriorityAppointment}`]: {
    borderLeft: `4px solid ${teal[500]}`
  },
  [`&.${classes.mediumPriorityAppointment}`]: {
    borderLeft: `4px solid ${blue[500]}`
  },
  [`&.${classes.lowPriorityAppointment}`]: {
    borderLeft: `4px solid ${indigo[500]}`
  }
}));

const StyledAppointmentsAppointmentContent = styled(
  Appointments.AppointmentContent
)(({ theme: { palette } }) => ({
  [`& .${classes.text}`]: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  [`& .${classes.content}`]: {
    opacity: 0.7
  },
  [`& .${classes.container}`]: {
    width: "100%",
    lineHeight: 1.2,
    height: "100%"
  }
}));

// Tydzień początkowo wyświetlona (zawiera dzisiejszą datę)
const isWeekEnd = (date: Date): boolean =>
  date.getDay() === 0 || date.getDay() === 6;
const getDefaultCurrentDate = () => {
    const currentDate = new Date();
    const defaultCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const dayOfWeek = defaultCurrentDate.getDay();
    const diff = defaultCurrentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Poniedziałek: 1, Niedziela: 0
    defaultCurrentDate.setDate(diff);
    return(defaultCurrentDate)
}

// Stylowanie kafelków, zostaje tu
const Appointment = ({ data, ...restProps }: Appointments.AppointmentProps) => (
  <StyledAppointmentsAppointment
    {...restProps}
    className={classNames({
      [classes.highPriorityAppointment]: data.priority === 1,
      [classes.mediumPriorityAppointment]: data.priority === 2,
      [classes.lowPriorityAppointment]: data.priority === 3,
      [classes.appointment]: true
    })}
    data={data}
  />
);

const StyledGrid = styled(Grid)(() => ({
    [`&.${classes.textCenter}`]: {
      textAlign: "center"
    }
  }));


function CalendarComponent({ appointments, resources, who }){
    let navigate = useNavigate()
    const [visitIdToRemove, setVisitIdToRemove] = React.useState(null)
    const [open, setOpen] = React.useState(false);

    const handleClickToRemove = (visitId) => {
      setVisitIdToRemove(visitId)
      setOpen(true);
    };

    const handleConfirmVisitRemoving = () => {
      console.log(visitIdToRemove)
      deleteData('api/Visit/' + visitIdToRemove + '/DeleteVisit').then((result) => {
        if(result === true){
          window.location.reload();
        }
    })
    }
  
    const handleRejectVisitRemoving = () => {
      setVisitIdToRemove(null)
      setOpen(false);
    };
    const Content = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container alignItems="center">
        <StyledGrid item xs={2} className={classes.textCenter}>
            {who === "vet"? <img src={OwnerIcon} alt="OwnerIcon"></img> : <img src={VetIcon} alt="VetIcon"></img>}
        </StyledGrid>
        <Grid item xs={10}>
        {who === "vet"? <span>{appointmentData.owner}</span> : <span>{appointmentData.vet}</span>}
        </Grid>
        <StyledGrid item xs={2} className={classes.textCenter}>
            <img src={PetIcon} alt="OwnerIcon"></img>
        </StyledGrid>
        <Grid item xs={10}>
          <span>{appointmentData.patient}</span>
        </Grid>
        {/* <StyledGrid item xs={2} className={classes.textCenter}>
            {who !== "vet" ? <StyledRoom className={classes.icon} /> : <div></div>}
        </StyledGrid> */}
        {/* <Grid item xs={10}>
            {who !== "vet" ? <span>{appointmentData.address}</span> : <div></div>}
        </Grid> */}
        <StyledGrid item xs={2} className={classes.textCenter}>
            <img src={InfoIcon} alt="InfoIcon"></img>
        </StyledGrid>
        <Grid item xs={10}>
            {appointmentData.extraInfo !== '' ? <span>{appointmentData.extraInfo}</span> : <span>Brak</span>}
          </Grid>
        <Grid item xs={10}>
            {who === "vet" && appointmentData.isCompleted === false ? <button className="startVisit__btn" onClick={() => handleStartVisit(appointmentData.id, appointmentData.visitTypeId)}>Rozpocznij wizytę</button> : <div></div>}
        </Grid>
        <Grid item xs={10}>
            {who === "vet" && appointmentData.isCompleted === false ? <button className="startVisit__btn" style={{backgroundColor: "red"}} onClick={() => handleClickToRemove(appointmentData.id)}>Usuń wizytę</button> : <div></div>}
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  );

  const handleStartVisit = (id, type) => {
    navigate(`/vetMenu/calendar/startVisit/${id}/type/${type}`)
}
    //Stylowanie wnętrza kafelka
// #FOLD_BLOCK
    const AppointmentContent = ({
        data,
        ...restProps
    }: // #FOLD_BLOCK
    Appointments.AppointmentContentProps) => {
        let priority = "low";
        if (data.priority === 2) priority = "medium";
        if (data.priority === 3) priority = "high";
        return (
        <StyledAppointmentsAppointmentContent {...restProps} data={data}>
            <div className={classes.container}>
                <div className={classes.text}>{data.title}</div>
                <div className={classNames(classes.text, classes.content)}>
                    {who === "vet" ? `Właściciel: ${data.owner}`: `Weterynarz: ${data.vet}`}
                </div>
                <div className={classNames(classes.text, classes.content)}>
                    {who === "vet" ? `Pacjent: ${data.patient}`: `Pupil: ${data.patient}`}
                </div>
                {/* {
                    who !== "vet" ? 
                    <div>
                        <div className={classNames(classes.text, classes.content)}>
                            {`Miesce wizyty: ${data.address}`}
                        </div>
                    </div> : <div></div>
                } */}
            </div>
        </StyledAppointmentsAppointmentContent>
        );
    };
    return(
        <div className="calendar">
            <ThemeProvider theme={theme}>
                <Typography component={'span'} variant={'body2'}>
                <div>
      <Dialog
        sx={{zIndex: 1000000000000}}
        open={open}
        onClose={handleRejectVisitRemoving}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Usuwanie wizyty"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Czy na pewno chce usunąć tą wizytę?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmVisitRemoving}>Tak</Button>
          <Button onClick={handleRejectVisitRemoving} autoFocus>
            Nie
          </Button>
        </DialogActions>
      </Dialog>
    </div>
                    <Paper style={{paddingTop: "9em"}}>
                        <Scheduler data={appointments} locale="pl-PL">
                            <ViewState defaultCurrentDate={getDefaultCurrentDate()} />
                            {/* <MonthView
                                dayScaleCellComponent={DayScaleCell}
                                timeTableCellComponent={TimeTableCell}
                            /> */}
                            <DayView
                                displayName={"Tygodniowy"}
                                startDayHour={7.5}
                                endDayHour={17.5}
                                intervalCount={7}
                            />

                            <Appointments
                                appointmentComponent={Appointment}
                                appointmentContentComponent={AppointmentContent}
                            />
                            <Resources data={resources} />

                            <AppointmentTooltip
                                contentComponent={Content}
                                showCloseButton
                            />
                            <Toolbar />
                            <DateNavigator />
                            <ViewSwitcher />
                            <TodayButton />
                        </Scheduler>
                    </Paper>
                </Typography>
            </ThemeProvider>
        </div>
    )
}

export default CalendarComponent;