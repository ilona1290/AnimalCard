import React from "react";
import { Link } from 'react-router-dom';
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent.tsx";
import { indigo, blue, teal } from "@mui/material/colors";
import { getData } from "../../components/Services/AccessAPI.js";
import SessionManager from "../../components/Auth/SessionManager.js";
import Loader from "../../components/Loader";

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
    // {
    //     fieldName: "address",
    //     title: "Adres",
    //     instances: []
    // }
];

function OwnerCalendar(){
    const [isLoading, setLoading] = React.useState(true);
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
        getData(`api/Visit/${SessionManager.getUserId()}/GetOwnerScheduledVisits`).then((result) => {
            setScheduledVisitsFromAPI(result.scheduledVisits);
            setLoading(false)
        })
        if(scheduledVisitsFromAPI.length !== 0){
            prepareScheduledVisits()
        }
    }, [isLoading])

    const prepareScheduledVisits = () => {
        const data = scheduledVisitsFromAPI.map(obj => {
            const { id, visitTypeId, visitTypeName, startDate, endDate, patient, vet, isCompleted, extraInfo } = obj; // Wybierz potrzebne właściwości obiektu z pierwszej tablicy
            return { id, visitTypeId, title: visitTypeName, startDate, endDate, patient, vet, isCompleted, extraInfo }; // Utwórz nowy obiekt z wybranymi właściwościami
          });
        setScheduledVisits(data)
    }
    return(
        <div>
            {isLoading && <Loader />}
            {!isLoading && <div>
                <Link to="/ownerMenu">
                    <button className="header__buttons__end__btn" style={{position: "absolute", right: "3%", top: "4em"}}>Powrót</button>
                </Link>
                <CalendarComponent appointments={scheduledVisits} resources={resources} who="owner"/>
            </div>}
        </div>
    )
}

export default OwnerCalendar;