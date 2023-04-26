import React, { useState, useEffect } from "react";
import { getData } from "../../components/Services/AccessAPI";
import SessionManager from "../../components/Auth/SessionManager";
import { Link } from 'react-router-dom';

import './VetProfile.css';

import downArrowButtonIcon from './down-arrow 2 (2).svg';
import upArrowButtonIcon from './up-arrow 2.svg';

function VetProfile(){
    const [isLoading, setLoading] = useState(true);
    const [info, setInfo] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [servicesTreatments, setServicesTreatments] = useState([]);

    const [expandedAdresses, setExpandedAdresses] = useState(false)
    const [expandedDiseases, setExpandedDiseases] = useState(false)
    const [expandedServicesTreatments, setExpandedServicesTreatments] = useState(false)

    const addressesToDisplay = expandedAdresses ? addresses : addresses.slice(0, 1);
    const diseasesToDisplay = expandedDiseases ? diseases : diseases.slice(0, 3);
    const servicesTreatmentsToDisplay = expandedServicesTreatments ? servicesTreatments : servicesTreatments.slice(0, 3);

    useEffect(() => {
        getData('api/Vet/' + SessionManager.getUserId()).then((result) => {
            setInfo(result);
            setAddresses(result.addresses)
            setDiseases(result.diseases)
            setServicesTreatments(result.servicesTreatments)
            setLoading(false);
        })
    }, [isLoading, info])

    
    return(
        <div style={{height: "100%"}}>
            {!isLoading && 
            <div className="vetProfile">
                <div className="vetProfile__basicInfo">
                    <img className="vetProfile__basicInfo_profilePicture" src={info.profilePicture} alt="VetProfilePicture"></img>
                    <div className="vetProfile__basicInfo_nameSurname">{info.name} {info.surname}</div>
                    <div className="vetProfile__basicInfo_contact"><div className="vetProfile__basicInfo_header">Email:</div> {info.email}</div>
                    <div className="vetProfile__basicInfo_contact"><div className="vetProfile__basicInfo_header">Nr telefonu:</div> {info.phoneNumber}</div><br></br>
                    {info.aboutMe !== "" && <div><div className="vetProfile__basicInfo_header">O mnie:</div>
                    <div className="vetProfile__basicInfo_aboutMe">{info.aboutMe}</div></div>}
                </div>
                <div className="vetProfile__extraInfo">
                <Link to="/logout">
                    <button className="header__buttons__end__btn" style={{position: "absolute", right: "1em", top: "1em"}}>
                        <p>Wyloguj</p>
                    </button>
                </Link>
                <Link to="/vetMenu">
                    <button className="header__buttons__end__btn" style={{position: "absolute", right: "10em", top: "1em"}}>
                        <p>Powrót</p>
                    </button>
                </Link><br/>
                    <div className="vetProfile__extraInfo_header">Adresy:</div>
                    {addressesToDisplay.map((elem, index) => (
                        <div className="vetProfile__extraInfo__address">{elem.nameOfPlace}<br/>{elem.street} {elem.houseNumber} 
                            {elem.premisesNumber !== 0 && <div style={{display: "inline"}}> \ {elem.premisesNumber}</div>}
                            {elem.district !== "" && <div style={{display: "inline"}}>, {elem.district}, </div>}
                            {elem.city}
                            <br/><br/>
                        </div>
                    ))}
                    <button type="button" className="showMoreLess__button" onClick={() => setExpandedAdresses(!expandedAdresses)}>
                        {expandedAdresses ? <img src={upArrowButtonIcon} alt="upArrowButtonIcon"></img> : <img src={downArrowButtonIcon} alt="downArrowButtonIcon"></img>} 
                    </button>
                    <br />
                    <div className="vetProfile__extraInfo_header">Leczone choroby:</div>
                    {diseasesToDisplay.map((elem, index) => (
                        <div className="vetProfile__extraInfo__address">{elem.name}<br/> 
                        </div>
                    ))}
                    <button type="button" className="showMoreLess__button2" onClick={() => setExpandedDiseases(!expandedDiseases)}>
                        {expandedDiseases ? <img src={upArrowButtonIcon} alt="upArrowButtonIcon"></img> : <img src={downArrowButtonIcon} alt="downArrowButtonIcon"></img>} 
                    </button>
                    <br /><br />
                    <div className="vetProfile__extraInfo_header">Świadczone usługi i wykonywane zabiegi:</div>
                    {servicesTreatmentsToDisplay.map((elem, index) => (
                        <div className="vetProfile__extraInfo__address">{elem.name}<br/> 
                        </div>
                    ))}
                    <button type="button" className="showMoreLess__button2" onClick={() => setExpandedServicesTreatments(!expandedServicesTreatments)}>
                        {expandedServicesTreatments ? <img src={upArrowButtonIcon} alt="upArrowButtonIcon"></img> : <img src={downArrowButtonIcon} alt="downArrowButtonIcon"></img>} 
                    </button>
                </div>
            </div>}
        </div>
    );
}

export default VetProfile;