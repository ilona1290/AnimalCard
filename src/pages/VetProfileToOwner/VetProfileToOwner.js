import React, { useState, useEffect } from "react";
import { getData } from "../../components/Services/AccessAPI";
import SessionManager from "../../components/Auth/SessionManager";
import { Link, useParams } from 'react-router-dom';

import downArrowButtonIcon from '../VetProfile/down-arrow 2 (2).svg'
import upArrowButtonIcon from '../VetProfile/up-arrow 2.svg';
import Loader from "../../components/Loader";

function VetProfileToOwner(){
    const {vetId} = useParams();
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
        getData('api/Vet/' + vetId).then((result) => {
            setInfo(result);
            setAddresses(result.addresses)
            setDiseases(result.diseases)
            setServicesTreatments(result.servicesTreatments)
            setLoading(false);
        })
    }, [isLoading, info])
 
    return(
        <div style={{height: "100%"}}>
            {isLoading && <Loader />}
            <Link to="/ownerMenu/vets">
                <button className="header__buttons__end__btn" style={{position: "absolute", top: "3.5em", right: "2%", zIndex: "1000"}}>Powrót</button>
            </Link>
            {!isLoading && 
            <div className="vetProfile">
                <div className="vetProfile__basicInfo">
                    <img className="vetProfile__basicInfo_profilePicture" src={info.profilePicture} alt="VetProfilePicture"></img><br></br><br></br>
                    <div className="vetProfile__basicInfo_nameSurname">{info.name} {info.surname}</div>
                    <div className="vetProfile__basicInfo_contact"><div className="vetProfile__basicInfo_header">Email:</div> {info.email}</div>
                    <div className="vetProfile__basicInfo_contact"><div className="vetProfile__basicInfo_header">Nr telefonu:</div> {info.phoneNumber}</div><br></br>
                    {info.aboutMe !== "" && <div><div className="vetProfile__basicInfo_header">O mnie:</div>
                    <div className="vetProfile__basicInfo_aboutMe">{info.aboutMe}</div></div>}
                </div>
                <div className="vetProfile__extraInfo">
                    <div className="vetProfile__extraInfo_header">Adresy:</div>
                    {addressesToDisplay.map((elem, index) => (
                        <div className="vetProfile__extraInfo__address">{elem.nameOfPlace}<br/>{elem.street} {elem.houseNumber} 
                            {elem.premisesNumber !== null && <div style={{display: "inline"}}> \ {elem.premisesNumber}</div>}
                            {elem.district !== "" && <div style={{display: "inline"}}>, {elem.district}, </div>}
                            {elem.district === "" && <div style={{display: "inline"}}>, {elem.city}</div>}
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

export default VetProfileToOwner;