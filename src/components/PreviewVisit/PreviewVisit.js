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


function PreviewVisit({ visitId, handleShowPreview, rabiesVaccinations, infectiousDiseaseVaccinations, treatments, diseases, researches, weights }){
    let navigate = useNavigate();
    const animateButton = (e) => {
        let weightToSend = 0;
        if(weights.length !== 0 && weights[0].weightValue !== ""){
            weightToSend = Number(weights[0].weightValue);
        }
        let objToSend = {
            visitId: visitId,
            rabiesVaccination: rabiesVaccinations[0],
            otherVaccinations: infectiousDiseaseVaccinations,
            treatments: treatments,
            treatedDiseases: diseases,
            research: researches[0],
            weight: weightToSend
        }
        console.log(objToSend)
        e.target.innerText = ""
        e.preventDefault();
        //reset animation
        e.target.classList.remove('animate');

        e.target.classList.add('animate');

        e.target.classList.add("circle")
        e.target.classList.add('animate');

        postData(`api/Visit/${SessionManager.getUserId()}/CompleteVisit`, objToSend).then((result) => {
            e.target.classList.remove('animate');
            if(result === true){
                e.target.classList.add('success');
                setTimeout(function(){
                    navigate("/vetMenu/calendar");
                  },500);
            }
        })
        // setTimeout(function(){
        //     navigate("/vetMenu/calendar")
        // }, 3200);
        // setTimeout(function(){
        //     e.target.classList.remove('animate');
        // },4000);
    };

    const returnPreviewVisits = () => {
        console.log(weights)
        if(rabiesVaccinations.length !== 0){
            return(
                <>
                    <PreviewVisitRabiesVaccination rabiesVaccinations={rabiesVaccinations}/>
                    {weights.length !== 0 && weights[0].weightValue !== "" && <PreviewWeight weights={weights}/>}
                </>)
        }
        if(infectiousDiseaseVaccinations.length !== 0){
            return(
                <>
                    <PreviewVisitOtherVaccinations otherVaccinations={infectiousDiseaseVaccinations}/>
                    {weights.length !== 0 && weights[0].weightValue !== "" && <PreviewWeight weights={weights}/>}
                </>)
        }
        if(treatments.length !== 0){
            return(
                <>
                    <PreviewTreatments treatments={treatments}/>
                    {weights.length !== 0 && weights[0].weightValue !== "" && <PreviewWeight weights={weights}/>}
                </>)
        }
        if(diseases.length !== 0){
            return(
                <>
                    <PreviewDiseases diseases={diseases}/>
                    {weights.length !== 0 && weights[0].weightValue !== "" && <PreviewWeight weights={weights}/>}
                </>)
        }
        if(researches.length !== 0){
            return(
                <>
                    <PreviewResearches researches={researches}/>
                    {weights.length !== 0 && weights[0].weightValue !== "" && <PreviewWeight weights={weights}/>}
                </>)
        }
    }
    return(
        <div>
            <button className="header__buttons__end__btn" id="backPreview" style={{position: "absolute", right: "2em", top: "3.5em"}} onClick={handleShowPreview}>
                <p>Chcę jeszcze coś zmienić</p>
            </button>
            {returnPreviewVisits()}
            <button className="header__buttons__end__btn save__btn" onClick={animateButton}>
                Zapisz
            </button>
        </div>
    )
}

export default PreviewVisit;