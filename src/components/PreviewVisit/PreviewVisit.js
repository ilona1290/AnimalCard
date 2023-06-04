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


function PreviewVisit({ visitId, handleShowPreview, rabiesVaccinations, infectiousDiseaseVaccinations, treatments, diseases, researches, weights, ownerAndPatient }){
    const [visitCard, setVisitCard] = React.useState({visitCardFileName: "", visitCardPath: ""});
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
            weight: weightToSend,
            completedVisit: visitCard
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
    };

    const returnPreviewVisits = () => {
        console.log(weights)
        return(
            <>
                {visitId === "0" && <PreviewOwnerAndPet ownerAndPatient={ownerAndPatient}/>}
                {rabiesVaccinations.length !== 0 && <PreviewVisitRabiesVaccination rabiesVaccinations={rabiesVaccinations}/>}
                {infectiousDiseaseVaccinations.length !== 0 && <PreviewVisitOtherVaccinations otherVaccinations={infectiousDiseaseVaccinations}/>}
                {treatments.length !== 0 && <PreviewTreatments treatments={treatments}/>}
                {diseases.length !== 0 && <PreviewDiseases diseases={diseases}/>}
                {researches.length !== 0 && <PreviewResearches researches={researches}/>}
                {weights.length !== 0 && weights[0].weightValue !== "" && <PreviewWeight weights={weights}/>}
            </>
        )
    }

    const handleSend = () => {
        const fileInput = document.getElementById('visitCardFile');
        fileInput.click();
        fileInput.addEventListener('change', handleCompletedVisitChange);
    }

    const handleCompletedVisitChange = (e) => {
        e.preventDefault();
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('image', element);
        }
        form.append('fileName', "Img");
        addImage(form);
    };

    const addImage = (form) => {
        fetch('https://animalcardapi.somee.com/api/upload/visitcards',
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
            let cardInfo = {
                visitCardFileName: result.name,
                visitCardPath: result.path
            }
            setVisitCard(cardInfo)

            // postData('api/Pet/AddResearchResult', resultToSend).then((result) => {
            //     if(result === true){
            //         window.location.reload();
            //     }
            // })
        })
    }
    return(
        <div>
            <button className="header__buttons__end__btn" id="backPreview" style={{position: "absolute", right: "2em", top: "3.5em"}} onClick={handleShowPreview}>
                <p>Chcę jeszcze coś zmienić</p>
            </button>
            <div>
                <h4>Jeśli chcesz przesłać kartę wizyty, którą posiadasz?</h4><br></br>
                {visitCard.visitCardFileName !== "" && <div><a href = {visitCard.visitCardPath} style={{fontSize: "2rem", color: "black", paddingBottom: "3em"}} target = "_blank">{visitCard.visitCardFileName}</a><br></br></div>}
                <br></br>
                <button className="header__buttons__end__btn" style={{margin: 0}} onClick={handleSend}>
                    <p>Prześlij</p>
                </button>
                <input id = 'visitCardFile' type="file" style={{display: "none"}}/>
            </div><br></br>
            {returnPreviewVisits()}
            <button className="header__buttons__end__btn save__btn" onClick={animateButton}>
                Zapisz
            </button>
        </div>
    )
}

export default PreviewVisit;