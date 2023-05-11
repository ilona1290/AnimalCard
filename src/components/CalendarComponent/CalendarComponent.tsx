import React from "react";

import { Link } from 'react-router-dom';
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
import { indigo, blue, teal } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import classNames from "clsx";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import './CalendarComponent.css'

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
  container: `${PREFIX}-container`
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

const resources = [
  {
    fieldName: "location",
    title: "Location",
    instances: [
      { id: "Room 1", text: "Room 1", color: indigo },
      { id: "Room 2", text: "Room 2", color: blue },
      { id: "Room 3", text: "Room 3", color: teal }
    ]
  },
  {
    fieldName: "priority",
    title: "Priority",
    instances: [
      { id: 1, text: "High Priority", color: teal },
      { id: 2, text: "Medium Priority", color: blue },
      { id: 3, text: "Low Priority", color: indigo }
    ]
  },
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

const isWeekEnd = (date: Date): boolean =>
  date.getDay() === 0 || date.getDay() === 6;
const defaultCurrentDate = new Date(2023, 4, 8, 11, 15);

const DayScaleCell = ({
  startDate,
  ...restProps
}: MonthView.DayScaleCellProps) => (
  <StyledMonthViewDayScaleCell
    className={classNames({
      [classes.weekEndDayScaleCell]: isWeekEnd(startDate)
    })}
    startDate={startDate}
    {...restProps}
  />
);

const TimeTableCell = ({
  startDate,
  ...restProps
}: MonthView.TimeTableCellProps) => (
  <StyledMonthViewTimeTableCell
    className={classNames({
      [classes.weekEndCell]: isWeekEnd(startDate!)
    })}
    startDate={startDate}
    {...restProps}
  />
);

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
        {/* <div className={classNames(classes.text, classes.content)}>
          {`Priority: ${priority}`}j
        </div>
        <div className={classNames(classes.text, classes.content)}>
          {`Location: ${data.location}`}
        </div> */}
        <div className={classNames(classes.text, classes.content)}>
          {`Pacjent: ${data.patient}`}
        </div>
        <div className={classNames(classes.text, classes.content)}>
          {`Właściciel: ${data.owner}`}
        </div>
        {/* <Link to="/vetMenu/calendar/startVisit">
                <button className="header__buttons__end__btn">Rozpocznij wizytę</button>
            </Link> */}
      </div>
    </StyledAppointmentsAppointmentContent>
  );
};

function CalendarComponent(){
    return(
        <ThemeProvider theme={theme}>
                <Typography component={'span'} variant={'body2'}>
        <Paper style={{paddingTop: "9em"}}>
    <Scheduler data={appointments} locale="pl-PL">
      <ViewState defaultCurrentDate={defaultCurrentDate} />

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

      <AppointmentTooltip showCloseButton />
      <Toolbar />
      <DateNavigator />
      <ViewSwitcher />
      <TodayButton />
    </Scheduler>
  </Paper>
  </Typography>
  </ThemeProvider>
    )
}

export default CalendarComponent;