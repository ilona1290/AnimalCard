import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import "./PreviewVisit.css";
import PreviewVisitRabiesVaccination from "../PreviewVisitRabiesVaccination/PreviewVisitRabiesVaccination";
import PreviewVisitOtherVaccinations from "../PreviewVisitOtherVaccinations/PreviewVisitOtherVaccinations";
import PreviewTreatments from "../PreviewTreatments/PreviewTreatments";
import PreviewDiseases from "../PreviewDiseases/PreviewDiseases";
import PreviewResearches from "../PreviewResearches/PreviewResearches";
import PreviewWeight from "../PreviewWeight/PreviewWeight";


function PreviewVisit({ handleShowPreview, rabiesVaccinations, infectiousDiseaseVaccinations, treatments, diseases, researches, weights }){
    let navigate = useNavigate();

    const animateButton = (e) => {
        e.target.innerText = ""
        e.preventDefault();
        //reset animation
        e.target.classList.remove('animate');

        e.target.classList.add('animate');

        e.target.classList.add('animate');
        setTimeout(function(){
            navigate("/vetMenu/calendar")
        }, 3200);
        setTimeout(function(){
            e.target.classList.remove('animate');
        },4000);
    };

    const returnPreviewVisits = () => {
        if(rabiesVaccinations.length !== 0){
            return(
                <>
                    <PreviewVisitRabiesVaccination rabiesVaccinations={rabiesVaccinations}/>
                    <PreviewWeight weights={weights}/>
                </>)
        }
        if(infectiousDiseaseVaccinations.length !== 0){
            return(
                <>
                    <PreviewVisitOtherVaccinations otherVaccinations={infectiousDiseaseVaccinations}/>
                    <PreviewWeight weights={weights}/>
                </>)
        }
        if(treatments.length !== 0){
            return(
                <>
                    <PreviewTreatments treatments={treatments}/>
                    <PreviewWeight weights={weights}/>
                </>)
        }
        if(diseases.length !== 0){
            return(
                <>
                    <PreviewDiseases diseases={diseases}/>
                    <PreviewWeight weights={weights}/>
                </>)
        }
        if(researches.length !== 0){
            return(
                <>
                    <PreviewResearches researches={researches}/>
                    <PreviewWeight weights={weights}/>
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