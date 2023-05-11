import React from "react";
import DataTable from "../../components/DataTable";
import { useParams, useNavigate } from 'react-router-dom'

import ResearchResult1 from './Badanie1.pdf'

const rows = [
    {
        id: 1, 
        ResearchResultDate: new Date("2015-06-07"),
        ResearchResult: "Badanie 1.pdf"
    },
    {
        id: 2, 
        ResearchResultDate: new Date("2014-11-30"),
        ResearchResult: "Badanie 2.pdf"
    },
    {
        id: 3, 
        ResearchResultDate: new Date("2014-06-12"),
        ResearchResult: "Badanie 3.pdf"
    },
  ];
  
  const columns = [
    { field: "ResearchResultDate", headerName: "Data wyniku badań", type: "date", flex: 2, minWidth: 150, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data wyniku badań'}
        </strong>
      )},
    { field: "ResearchResult", headerName: "Wynik badań", type: "string", flex: 3, minWidth: 200, headerAlign: 'center',align: 'center', renderHeader: () => (
        <strong>
          {'Wynik badań'}
        </strong>
      ),
      renderCell: (params) => (
        <a href = {ResearchResult1} target = "_blank">{params.value.toString()}</a>
      )
    }
  ];

function ResearchResults(){
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
            <DataTable rows={rows} columns={columns} paddingProp="7%"/>
        </div>
    )
}

export default ResearchResults;