import React from "react";
import DataTable from "../../components/DataTable";
import { useParams, useNavigate } from 'react-router-dom'

const rows = [
    {
        id: 1, 
        VaccinationDate: new Date("2023-07-12"),
        DiseaseName: "Nosówka",
        VaccineName: "Versican Plus DHPPi/L4R", 
        VaccineBatchNumer: "569865",
        Vet: "Marcin Klimczak"
    },
    {
        id: 2, 
        VaccinationDate: new Date("2022-02-08"),
        DiseaseName: "Parwowiroza",
        VaccineName: "Eryseng Parvo",
        VaccineBatchNumer: "365478",
        Vet: "Marcin Klimczak"
    },
    {
        id: 3, 
        VaccinationDate: new Date("2021-09-25"),
        DiseaseName: "Kaszel psi",
        VaccineName: "Versican Plus DHPPi/L4",
        VaccineBatchNumer: "569889",
        Vet: "Marcin Klimczak"
    },
  ];
  
  const columns = [
    { field: "VaccinationDate", headerName: "Data szczepienia", type: "date", flex: 1, minWidth: 140, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data szczepienia'}
        </strong>
      )},
      { field: "DiseaseName", headerName: "Nazwa choroby", type: "string", flex: 1, minWidth: 140, headerAlign: 'center',align: 'center', renderHeader: () => (
        <strong>
          {'Nazwa choroby'}
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
    { field: "Vet", headerName: "Weterynarz", type: "string", flex:1, minWidth: 120, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Weterynarz'}
        </strong>
      )},
  ];

function OtherVaccinations(){
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
            <DataTable rows={rows} columns={columns} paddingProp="7%"/>
        </div>
    )
}

export default OtherVaccinations;