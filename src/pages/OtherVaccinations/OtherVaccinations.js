import React, { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { useParams, useNavigate } from 'react-router-dom'
import { getData } from "../../components/Services/AccessAPI";
import Loader from "../../components/Loader";
import SessionManager from "../../components/Auth/SessionManager";
  
  const columns = [
    { field: "vaccinationDate", headerName: "Data szczepienia", type: "date", flex: 1, minWidth: 140, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data szczepienia'}
        </strong>
      )},
      { field: "diseaseName", headerName: "Nazwa choroby", type: "string", flex: 1, minWidth: 140, headerAlign: 'center',align: 'center', renderHeader: () => (
        <strong>
          {'Nazwa choroby'}
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
    { field: "vet", headerName: "Weterynarz", type: "string", flex:1, minWidth: 120, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Weterynarz'}
        </strong>
      )},
  ];

function OtherVaccinations(){
    let navigate = useNavigate();
    const {petId} = useParams();

    const [rows, setRows] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getData(`api/Pet/${petId}/OtherVaccinations`).then((result) => {
          const data = result.petOtherVaccinations.map(obj => {
            const { id, diseaseName, name, series, vaccinationDate, vet } = obj; // Wybierz potrzebne właściwości obiektu z pierwszej tablicy
            return { id, diseaseName, name, series, vaccinationDate: new Date(vaccinationDate), vet }; // Utwórz nowy obiekt z wybranymi właściwościami
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
            <DataTable rows={rows} columns={columns} paddingProp="7%"/>
            </div>}
        </div>
    )
}

export default OtherVaccinations;