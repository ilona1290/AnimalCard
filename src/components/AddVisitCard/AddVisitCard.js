import React from "react";
import SessionManager from "../Auth/SessionManager";
import { postData } from "../Services/AccessAPI";
import { useNavigate } from 'react-router-dom'

function AddVisitCard({ visitId, petId, cardInfo }){
    let navigate = useNavigate();
    const [sendNormalVisitCard, setSendNormalVisitCard] = React.useState(false);

    const sendGeneratedVisit = (e) => {
        let visitToSend = {
            visitId: visitId,
            petId: petId,
            vetId: SessionManager.getUserId(),
            visitCardFileName: cardInfo.visitCardFileName,
            visitCardPath: cardInfo.visitCardPath
        }

        e.target.innerText = ""
        e.preventDefault();
        //reset animation
        e.target.classList.remove('animate');

        e.target.classList.add('animate');

        e.target.classList.add("circle")
        e.target.classList.add('animate');

        postData(`api/Visit/${SessionManager.getUserId()}/AddVisitCard`, visitToSend).then((result) => {
            e.target.classList.remove('animate');
            if(result === true){
                e.target.classList.add('success');
                setTimeout(function(){
                    navigate("/vetMenu/calendar");
                  },500);
            }
        })
    }

    const noClicked = () => {
        setSendNormalVisitCard(true);
    }

    const handleSendNormal = () => {
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
            let cardInfoNormal = {
                visitCardFileName: result.name,
                visitCardPath: result.path
            }
            let visitToSend = {
                visitId: visitId,
                petId: petId,
                vetId: SessionManager.getUserId(),
                visitCardFileName: cardInfoNormal.visitCardFileName,
                visitCardPath: cardInfoNormal.visitCardPath
            }
    
            postData(`api/Visit/${SessionManager.getUserId()}/AddVisitCard`, visitToSend).then((result) => {
                if(result === true){
                    setTimeout(function(){
                        navigate("/vetMenu/calendar");
                      },500);
                }
            })
        })
    }

    return(
        <div>
            <h3>Wygenerowaliśmy dla Ciebie kartę wizyty. Zerknij na nią i powiedz nam, czy chcesz ją zapisać w ksiązeczce zdrowia?</h3><br></br>
            <a href = {cardInfo.visitCardPath} style={{fontSize: "2rem", color: "blue", paddingBottom: "3em"}} target = "_blank">{cardInfo.visitCardFileName}</a><br></br><br></br>
                {sendNormalVisitCard === false ?
                    <div>
                        <button className="header__buttons__end__btn save__btn" onClick={sendGeneratedVisit}>
                            <p>Tak</p>
                        </button>
                        <button className="header__buttons__end__btn save__btn" onClick={noClicked}>
                            <p>Nie</p>
                        </button>
                    </div>
                    :
                    <div>
                        <h4>Jeśli chcesz przesłać kartę wizyty, którą posiadasz?</h4><br></br>
                        <br></br>
                        <button className="header__buttons__end__btn" style={{margin: 0}} onClick={handleSendNormal}>
                            <p>Prześlij</p>
                        </button>
                        <input id = 'visitCardFile' type="file" style={{display: "none"}}/>
                    </div>
                }
        </div>
    )
}

export default AddVisitCard;