import React, { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { useParams, useNavigate } from 'react-router-dom'
import { getData, postData } from "../../components/Services/AccessAPI";

// import ResearchResult1 from './Badanie1.pdf'
import Loader from "../../components/Loader/Loader";
import SessionManager from "../../components/Auth/SessionManager";

// const rows = [
//     {
//         id: 1, 
//         ResearchResultDate: new Date("2015-06-07"),
//         ResearchResult: "Badanie 1.pdf"
//     },
//     {
//         id: 2, 
//         ResearchResultDate: new Date("2014-11-30"),
//         ResearchResult: "Badanie 2.pdf"
//     },
//     {
//         id: 3, 
//         ResearchResultDate: new Date("2014-06-12"),
//         ResearchResult: "Badanie 3.pdf"
//     },
//   ];
  
  

function ResearchResults(){
    let navigate = useNavigate();
    const {petId} = useParams();

    const [rows, setRows] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [resultPath, setResultPath] = useState("");

    useEffect(() => {
        getData(`api/Pet/${petId}/Researches`).then((result) => {
          const data = result.petReaserches.map(obj => {
            const { id, researchesList, researchesDate, resultFileName, resultPath, resultDate, vet } = obj; // Wybierz potrzebne właściwości obiektu z pierwszej tablicy
            let formattedResultDate = resultDate;
            setResultPath(resultPath)
            if (resultDate) {
              formattedResultDate = new Date(resultDate);
            }
            else{
                formattedResultDate = ''
            }
            return { id, researchesList, researchesDate: new Date(researchesDate), resultFileName, resultPath, resultDate: formattedResultDate, vet }; // Utwórz nowy obiekt z wybranymi właściwościami
          })
            setRows(data);
            setLoading(false);
        })
    }, [])

    const columns = [
        { field: "researchesDate", headerName: "Data badań", type: "date", flex: 2, minWidth: 150, headerAlign: 'center', align: 'center', renderHeader: () => (
            <strong>
              {'Data Badań'}
            </strong>
          )},
        { field: "researchesList", headerName: "Lista elementów", type: "string", flex: 3, minWidth: 200, headerAlign: 'center',align: 'center', renderHeader: () => (
            <strong>
              {'Lista elementów'}
            </strong>
          )},
          { field: "resultFileName", headerName: "Wyniki badań", type: "string", flex: 3, minWidth: 200, headerAlign: 'center',align: 'center', renderHeader: () => (
            <strong>
              {'Wyniki badań'}
            </strong>
          ),
          renderCell: (params) => {
            const resultNameValue = params.value;
            if (resultNameValue === '') {
              return (
                <div>
                    <button className="header__buttons__end__btn" style={{margin: 0}} onClick={handleSend}>
                        <p>Prześlij wynik</p>
                    </button>
                    <input id = 'researchesResultFile' type="file" style={{display: "none"}}/>
                </div>
              );
            }
            return (
                <a href = {resultPath} target = "_blank">{params.value.toString()}</a>
            );
          },
        },
        { field: "resultDate", headerName: "Data wyniku", type: "date", flex: 2, minWidth: 150, headerAlign: 'center', align: 'center', renderHeader: () => (
            <strong>
              {'Data wyniku'}
            </strong>
          )},
          { field: "vet", headerName: "Weterynarz", type: "string", flex:2, minWidth: 140, headerAlign: 'center', align: 'center', renderHeader: () => (
            <strong>
              {'Weterynarz'}
            </strong>
          )},
      ];

      const addImage = (form) => {
        fetch('https://animalcardapi.somee.com/api/upload/researches',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + SessionManager.getToken()
                },
                body: form
            }
        ).then(function(response) {
            return response.json();
        }).then(function(result) {
            let resultToSend = {
                resultFileName: result.name,
                resultPath: result.path,
                petId: petId
            }

            postData('api/Pet/AddResearchResult', resultToSend).then((result) => {
                if(result === true){
                    window.location.reload();
                }
            })
        })
    }
    const handleSend = () => {
        const fileInput = document.getElementById('researchesResultFile');
        fileInput.click();
        fileInput.addEventListener('change', handleResearchResultChange);
      }

      const handleResearchResultChange = (e) => {
        e.preventDefault();
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('image', element);
        }
        form.append('fileName', "Img");
        addImage(form);
    };
    const handleBack = () => {
        navigate(`/pets/${petId}`)
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

export default ResearchResults;