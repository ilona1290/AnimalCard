import React from "react";
import DataTable from "../../components/DataTable";
import { useParams, useNavigate } from 'react-router-dom'

import Visit1 from './wizyta1.pdf'

const rows = [
    {
        id: 1, 
        VisitDate: new Date("2015-06-07"),
        VisitCard: "Wizyta 1.pdf"
    },
    {
        id: 2, 
        VisitDate: new Date("2014-11-30"),
        VisitCard: "Wizyta 2.pdf"
    },
    {
        id: 3, 
        VisitDate: new Date("2014-06-12"),
        VisitCard: "Wizyta 3.pdf"
    },
  ];
  
  const columns = [
    { field: "VisitDate", headerName: "Data wizyty", type: "date", flex: 1, minWidth: 100, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data wizyty'}
        </strong>
      )},
    { field: "VisitCard", headerName: "Karta informacyjna wizyty", type: "string", flex: 2, minWidth: 200, headerAlign: 'center',align: 'center', renderHeader: () => (
        <strong>
          {'Karta informacyjna wizyty'}
        </strong>
      ),
      renderCell: (params) => (
        <a href = {Visit1} target = "_blank">{params.value.toString()}</a>
      )
    }
  ];

function Visits(){
    let navigate = useNavigate();
    const {petId} = useParams();

    const handleBack = () => {
        navigate(`/pets/${petId}`)
    }
    return(
        <div style={{paddingTop: "9em", width: "100%"}}>
            <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "6.5%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <DataTable rows={rows} columns={columns} paddingProp="8%"/>
        </div>
    )
}

export default Visits;