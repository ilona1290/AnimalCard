import React, { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { useParams, useNavigate } from 'react-router-dom'
import { getData } from "../../components/Services/AccessAPI";
import Loader from "../../components/Loader";
import SessionManager from "../../components/Auth/SessionManager";

// const rows = [
//     {
//         id: 1, 
//         VaccinationDate: new Date("2023-03-22"),
//         VaccineName: "Biocan R", 
//         VaccineBatchNumer: "715315",
//         ExpirationDateVaccine: new Date("2024-08"),
//         NextVaccinationDate: new Date("2024-03-22"),
//         Vet: "Marcin Klimczak"
//     },
//     {
//         id: 2, 
//         VaccinationDate: new Date("2022-03-22"),
//         VaccineName: "Biocan R",
//         VaccineBatchNumer: "715315",
//         ExpirationDateVaccine: new Date("2023-08"),
//         NextVaccinationDate: new Date("2023-03-22"),
//         Vet: "Marcin Klimczak"
//     },
//     {
//         id: 3, 
//         VaccinationDate: new Date("2021-03-22"),
//         VaccineName: "Biocan R",
//         VaccineBatchNumer: "715315",
//         ExpirationDateVaccine: new Date("2022-08"),
//         NextVaccinationDate: new Date("2022-03-22"),
//         Vet: "Marcin Klimczak"
//     },
//   ];
  
  const columns = [
    { field: "vaccinationDate", headerName: "Data szczepienia", type: "date", flex: 1, minWidth: 140, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data szczepienia'}
        </strong>
      )},
    { field: "name", headerName: "Nazwa szczepionki", type: "string", flex: 1, minWidth: 140, headerAlign: 'center',align: 'center', renderHeader: () => (
        <strong>
          {'Nazwa szczepionki'}
        </strong>
      )},
    { field: "series", headerName: "Nr serii szczepionki", type: "string", flex: 1,
    minWidth: 140, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Nr serii szczepionki'}
        </strong>
      )},
    { field: "termValidity", headerName: "Data ważności szczepionki", type: "date", flex: 1.5, minWidth: 160, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data ważności szczepionki'}
        </strong>
      )},
      { field: "termNext", headerName: "Termin następnego szczepienia", type: "date", flex: 1.5, minWidth: 160, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Termin następnego szczepienia'}
        </strong>
      )},
    { field: "vet", headerName: "Weterynarz", type: "string", flex:1, minWidth: 120, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Weterynarz'}
        </strong>
      )},
  ];

function RabiesVaccinations(){
    let navigate = useNavigate();
    const {petId} = useParams();
    const [rows, setRows] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getData(`api/Pet/${petId}/RabiesVaccinations`).then((result) => {
          const data = result.petRabiesVaccinations.map(obj => {
            const { id, name, series, termNext, termValidity, vaccinationDate, vet } = obj; // Wybierz potrzebne właściwości obiektu z pierwszej tablicy
            return { id, name, series, termNext: new Date(termNext), termValidity: new Date(termValidity), vaccinationDate: new Date(vaccinationDate), vet }; // Utwórz nowy obiekt z wybranymi właściwościami
          })
            setRows(data);
            setLoading(false);
        })
    }, [])

    const handleBack = () => {
        navigate(`/pets/${petId}/injections`)
    }
    return(
        <div style={{paddingTop: "9em", width: "100%"}}>
          {isLoading && <Loader />}
          {!isLoading && SessionManager.getPets().includes(petId) && <div>
            <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "2%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <DataTable rows={rows} columns={columns} paddingProp="10%"/>
            </div>}
        </div>
    )
}

export default RabiesVaccinations;