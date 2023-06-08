import React, { useState } from "react";
import SessionManager from "../../components/Auth/SessionManager";
import AnimalCardForm from "../../components/AnimalCardForm";


function CreateAnimalCard(){
    const [pet, setPet] = useState({
        vet: SessionManager.getUserId(),
        owner: "",
        identityNumber: "",
        photo: "https://animalcard.blob.core.windows.net/petsphotos/defaultPetPhoto.png",
        name: "",
        sex: "",
        dateBirth: null,
        breed: "",
        color: "",
        hairType: "",
        trademarks: "",
        allergies: "",
        extraInfo: ""
    })

    

    return(
        <div style={{width:"100%"}}>
            <AnimalCardForm type="create" petData={pet}/>
        </div>
    );
}

export default CreateAnimalCard;