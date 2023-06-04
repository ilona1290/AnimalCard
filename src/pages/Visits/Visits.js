import React, { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { useParams, useNavigate } from 'react-router-dom'
import { getData } from "../../components/Services/AccessAPI";

import Visit1 from './wizyta1.pdf'
import Loader from "../../components/Loader/Loader";


function Visits(){
    let navigate = useNavigate();
    const {petId} = useParams();
    const [rows, setRows] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [resultPath, setResultPath] = useState("");

    useEffect(() => {
        getData(`api/Pet/${petId}/CompletedVisits`).then((result) => {
        const data = result.petCompletedVisits.map(obj => {
            const { id, visitCardFileName, visitCardPath, visitDate, vet } = obj; // Wybierz potrzebne właściwości obiektu z pierwszej tablicy
            setResultPath(visitCardPath);
            return { id, visitCardFileName, visitCardPath, visitDate: new Date(visitDate), vet }; // Utwórz nowy obiekt z wybranymi właściwościami
        })
            setRows(data);
            setLoading(false);
        })
    }, [])

    const columns = [
    { field: "visitDate", headerName: "Data wizyty", type: "date", flex: 1, minWidth: 100, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
            {'Data wizyty'}
        </strong>
        )},
    { field: "visitCardFileName", headerName: "Karta informacyjna wizyty", type: "string", flex: 3, minWidth: 300, headerAlign: 'center',align: 'center', renderHeader: () => (
        <strong>
            {'Karta informacyjna wizyty'}
        </strong>
        ),
        renderCell: (params) => (
        <a href = {resultPath} target = "_blank">{params.value}</a>
        )
    },
    { field: "vet", headerName: "Weterynarz", type: "string", flex:2, minWidth: 140, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
        {'Weterynarz'}
        </strong>
    )},
    ];

    const handleBack = () => {
        navigate(`/pets/${petId}`)
    }
    return(
        <div style={{paddingTop: "9em", width: "100%"}}>
          {isLoading && <Loader />}
          {!isLoading && <div>
            <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "2%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <DataTable rows={rows} columns={columns} paddingProp="8%"/>
            </div>}
        </div>
    )
}

export default Visits;