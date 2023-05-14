import React from "react";
import DataTable from "../../components/DataTable";
import { useParams, useNavigate } from 'react-router-dom'

const rows = [
    {
        id: 1, 
        VaccinationDate: new Date("2023-03-22"),
        VaccineName: "Biocan R", 
        VaccineBatchNumer: "715315",
        ExpirationDateVaccine: new Date("2024-08"),
        NextVaccinationDate: new Date("2024-03-22"),
        Vet: "Marcin Klimczak"
    },
    {
        id: 2, 
        VaccinationDate: new Date("2022-03-22"),
        VaccineName: "Biocan R",
        VaccineBatchNumer: "715315",
        ExpirationDateVaccine: new Date("2023-08"),
        NextVaccinationDate: new Date("2023-03-22"),
        Vet: "Marcin Klimczak"
    },
    {
        id: 3, 
        VaccinationDate: new Date("2021-03-22"),
        VaccineName: "Biocan R",
        VaccineBatchNumer: "715315",
        ExpirationDateVaccine: new Date("2022-08"),
        NextVaccinationDate: new Date("2022-03-22"),
        Vet: "Marcin Klimczak"
    },
  ];
  
  const columns = [
    { field: "VaccinationDate", headerName: "Data szczepienia", type: "date", flex: 1, minWidth: 140, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data szczepienia'}
        </strong>
      )},
    { field: "VaccineName", headerName: "Nazwa szczepionki", type: "string", flex: 1, minWidth: 140, headerAlign: 'center',align: 'center', renderHeader: () => (
        <strong>
          {'Nazwa szczepionki'}
        </strong>
      )},
    { field: "VaccineBatchNumer", headerName: "Nr serii szczepionki", type: "string", flex: 1,
    minWidth: 140, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Nr serii szczepionki'}
        </strong>
      )},
    { field: "ExpirationDateVaccine", headerName: "Data ważności szczepionki", type: "date", flex: 1.5, minWidth: 160, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data ważności szczepionki'}
        </strong>
      )},
      { field: "NextVaccinationDate", headerName: "Termin następnego szczepienia", type: "date", flex: 1.5, minWidth: 160, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Termin następnego szczepienia'}
        </strong>
      )},
    { field: "Vet", headerName: "Weterynarz", type: "string", flex:1, minWidth: 120, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Weterynarz'}
        </strong>
      )},
  ];

function RabiesVaccinations(){
    let navigate = useNavigate();
    const {petId} = useParams();

    const handleBack = () => {
        navigate(`/pets/${petId}/injections`)
    }
    return(
        <div style={{paddingTop: "9em", width: "100%"}}>
            <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "2%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <DataTable rows={rows} columns={columns} paddingProp="10%"/>
        </div>
    )
}

export default RabiesVaccinations;