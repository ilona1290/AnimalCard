import React from "react";
import { useNavigate } from 'react-router-dom'
import { postData } from "../../components/Services/AccessAPI";
import "./PreviewVisit.css";
import PreviewVisitRabiesVaccination from "../PreviewVisitRabiesVaccination/PreviewVisitRabiesVaccination";
import PreviewVisitOtherVaccinations from "../PreviewVisitOtherVaccinations/PreviewVisitOtherVaccinations";
import PreviewTreatments from "../PreviewTreatments/PreviewTreatments";
import PreviewDiseases from "../PreviewDiseases/PreviewDiseases";
import PreviewResearches from "../PreviewResearches/PreviewResearches";
import PreviewWeight from "../PreviewWeight/PreviewWeight";
import SessionManager from "../Auth/SessionManager";
import PreviewOwnerAndPet from "../PreviewOwnerAndPet/PreviewOwnerAndPet";
import AddVisitCard from "../AddVisitCard/AddVisitCard";


function PreviewVisit({ visitId, handleShowPreview, rabiesVaccinations, infectiousDiseaseVaccinations, treatments, diseases, researches, weights, ownerAndPatient }){
    const [visitCard, setVisitCard] = React.useState(null);
    let navigate = useNavigate();
    const animateButton = (e) => {
        let weightToSend = 0;
        if(weights.length !== 0 && weights[0].weightValue !== ""){
            weightToSend = Number(weights[0].weightValue);
        }
        let objToSend = {
            visitId: visitId,
            petId: ownerAndPatient.patientId,
            vetId: SessionManager.getUserId(),
            rabiesVaccination: rabiesVaccinations[0],
            otherVaccinations: infectiousDiseaseVaccinations,
            treatments: treatments,
            treatedDiseases: diseases,
            research: researches[0],
            weight: weightToSend
        }
        e.target.innerText = ""
        e.preventDefault();
        //reset animation
        e.target.classList.remove('animate');

        e.target.classList.add('animate');

        e.target.classList.add("circle")
        e.target.classList.add('animate');

        postData(`api/Visit/${SessionManager.getUserId()}/CompleteVisit`, objToSend).then((result) => {
            e.target.classList.remove('animate');
            if(result.result === true){
                e.target.classList.add('success');
                let cardInfo = {
                    visitCardFileName: result.generatedCardFileName,
                    visitCardPath: result.generatedCardPath
                }
                setVisitCard(cardInfo)
            }
        })
    };

    const returnPreviewVisits = () => {
        return(
            <div id="preview">
                {visitId === "0" && <PreviewOwnerAndPet ownerAndPatient={ownerAndPatient}/>}
                {rabiesVaccinations.length !== 0 && <PreviewVisitRabiesVaccination rabiesVaccinations={rabiesVaccinations}/>}
                {infectiousDiseaseVaccinations.length !== 0 && <PreviewVisitOtherVaccinations otherVaccinations={infectiousDiseaseVaccinations}/>}
                {treatments.length !== 0 && <PreviewTreatments treatments={treatments}/>}
                {diseases.length !== 0 && <PreviewDiseases diseases={diseases}/>}
                {researches.length !== 0 && <PreviewResearches researches={researches}/>}
                {weights.length !== 0 && weights[0].weightValue !== "" && <PreviewWeight weights={weights}/>}
            </div>
        )
    }

    return(
        <div>
            {visitCard === null ?
            <div>
                <button className="header__buttons__end__btn" id="backPreview" style={{position: "absolute", right: "2em", top: "3.5em"}} onClick={handleShowPreview}>
                    <p>Chcę jeszcze coś zmienić</p>
                </button>
                {returnPreviewVisits()}
                <button className="header__buttons__end__btn save__btn" onClick={animateButton}>
                    Zapisz
                </button>
            </div>
            : <AddVisitCard visitId ={visitId} petId={ownerAndPatient.patientId} cardInfo={visitCard}/>}
        </div>
    )
}

export default PreviewVisit;