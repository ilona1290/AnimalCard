import React from "react";
import { Link } from 'react-router-dom';
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent.tsx";
import { indigo, blue, teal } from "@mui/material/colors";

const appointments = [
    {
        title: "Szczepienie",
        startDate: new Date(2023, 4, 11, 9, 0),
        endDate: new Date(2023, 4, 11, 9, 30),
        priority: 2,
        location: "Room 3",
        patient: "Fifi",
        vet: "Marcin Klimczak",
        address: "Łąkowa 5",
    },
    {
        title: "Badanie",
        startDate: new Date(2023, 4, 8, 11, 0),
        endDate: new Date(2023, 4, 8, 12, 0),
        priority: 2,
        location: "Room 3",
        patient: "Barry",
        vet: "Marcin Klimczak",
        address: "Łąkowa 5",
    },
    {
        title: "Zabieg",
        startDate: new Date(2023, 4, 9, 9, 30),
        endDate: new Date(2023, 4, 9, 11, 0),
        priority: 3,
        location: "Room 2",
        patient: "Koba",
        vet: "Marcin Klimczak",
        address: "Łąkowa 5",
    },
  ];

  //do zewnętrznego, definicja informacji, które są w kafelku
const resources = [
    {
        fieldName: "patient",
        title: "Pacjent",
        instances: []
    },
    {
        fieldName: "vet",
        title: "Weterynarz",
        instances: []
    },
    {
        fieldName: "address",
        title: "Adres",
        instances: []
    }
];

function OwnerCalendar(){
    return(
        <div>
            <Link to="/ownerMenu">
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "3%", top: "4em"}}>Powrót</button>
            </Link>
            <CalendarComponent appointments={appointments} resources={resources} who="owner"/>
        </div>
    )
}

export default OwnerCalendar;