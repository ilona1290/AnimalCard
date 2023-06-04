import React from "react";

function PreviewOwnerAndPet({ ownerAndPatient} ){
    return(
        <div>
            <div className="pet__info__header">Właściciel</div>
                <div className="pet__form__info">{ownerAndPatient.owner}</div>
                <div className="pet__info__header">Pacjent</div>
                <div className="pet__form__info">{ownerAndPatient.patient}</div>
        </div>
    )
}

export default PreviewOwnerAndPet