import React from "react";
import DataTable from "../../components/DataTable";
import { Link, useParams, useNavigate } from 'react-router-dom'

const rows = [
    {
        id: 1, 
        TreatmentDate: new Date("2015-03-25"),
        Diagnosis: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", 
        Description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",  
        ControlDate: new Date("2021-08-15"),
        Vet: "Marcin Klimczak"
    },
    {
        id: 2, 
        TreatmentDate: new Date("2018-09-05"),
        Diagnosis: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.", 
        Description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",  
        ControlDate: new Date("2021-08-15"),
        Vet: "Marcin Klimczak"
    },
    {
        id: 3, 
        TreatmentDate: new Date("2022-02-01"),
        Diagnosis: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.", 
        Description: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",  
        ControlDate: new Date("2022-02-15"),
        Vet: "Marcin Klimczak"
    },
    {
        id: 4, 
        TreatmentDate: new Date("2022-02-01"),
        Diagnosis: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.", 
        Description: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",  
        ControlDate: new Date("2022-02-15"),
        Vet: "Marcin Klimczak"
    },
    {
        id: 5, 
        TreatmentDate: new Date("2022-02-01"),
        Diagnosis: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.", 
        Description: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",  
        ControlDate: new Date("2022-02-15"),
        Vet: "Marcin Klimczak"
    },
    {
        id: 6, 
        TreatmentDate: new Date("2022-02-01"),
        Diagnosis: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.", 
        Description: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",  
        ControlDate: new Date("2022-02-15"),
        Vet: "Marcin Klimczak"
    },
    {
        id: 7, 
        TreatmentDate: new Date("2022-02-01"),
        Diagnosis: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.", 
        Description: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",  
        ControlDate: new Date("2022-02-15"),
        Vet: "Marcin Klimczak"
    },
    {
        id: 8, 
        TreatmentDate: new Date("2022-02-01"),
        Diagnosis: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.", 
        Description: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",  
        ControlDate: new Date("2022-02-15"),
        Vet: "Marcin Klimczak"
    },
    {
        id: 9, 
        TreatmentDate: new Date("2022-02-01"),
        Diagnosis: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.", 
        Description: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",  
        ControlDate: new Date("2022-02-15"),
        Vet: "Marcin Klimczak"
    },
  ];
  
  const columns = [
    { field: "TreatmentDate", headerName: "Data", type: "date", width: 150, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data '}
        </strong>
      )},
    { field: "Diagnosis", headerName: "Diagnoza", type: "string", width: 350, headerAlign: 'center',align: 'center', renderHeader: () => (
        <strong>
          {'Diagnoza'}
        </strong>
      )},
    { field: "Description", headerName: "Opis", type: "string", width: 500, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Opis'}
        </strong>
      )},
    { field: "ControlDate", headerName: "Data kontroli", type: "date", width: 160, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Data kontroli'}
        </strong>
      )},
    { field: "Vet", headerName: "Weterynarz", type: "string", width: 250, headerAlign: 'center', align: 'center', renderHeader: () => (
        <strong>
          {'Weterynarz'}
        </strong>
      )},
  ];

function Treatments(){
    let navigate = useNavigate();
    const {petId} = useParams();

    const handleBack = () => {
        navigate(`/pets/${petId}`)
    }
    return(
        <div style={{paddingTop: "9%", width: "100%"}}>
            <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "6em", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <DataTable rows={rows} columns={columns} />
        </div>
    )
}

export default Treatments;