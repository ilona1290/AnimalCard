import React, { useState, useEffect } from "react";
import { getData, putData } from "../../components/Services/AccessAPI";
import SessionManager from "../../components/Auth/SessionManager";
import { Link, useNavigate } from 'react-router-dom';

import './VetProfile.css';

import downArrowButtonIcon from './down-arrow 2 (2).svg';
import upArrowButtonIcon from './up-arrow 2.svg';
import Loader from "../../components/Loader";

function VetProfile(){
    let navigate = useNavigate()
    const [isLoading, setLoading] = useState(true);
    const [isLoadingImage, setLoadingImage] = useState(true);
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
            setLoadingImage(false)
        })
    }, [isLoading, info])

    const addImage = (form) => {
        fetch('https://animalcardapi.somee.com/api/upload/profilepictures',
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
            setInfo({...info, profilePicture: result})
            SessionManager.updateProfilePicture(result);
            let resultToSend = {
                who: 'vet',
                id: Number(SessionManager.getUserId()),
                photo: result
            }
            
            putData('api/Photo/UpdatePhoto', resultToSend).then((result) => {
                if(result === true){
                    setLoadingImage(false)
                }
            })
        })
    }
    
    const handleImageChange = (e) => {
        setLoadingImage(true)
        e.preventDefault();
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('image', element);
        }
        form.append('fileName', "Img");
        addImage(form);
    };

    const handleUpdate = () => {
        navigate('/updateVetProfile')
    }

    return(
        <div style={{height: "100%"}}>
            {isLoading && <Loader />}
            <Link to="/vetMenu">
                <button className="header__buttons__end__btn" style={{position: "absolute", top: "3.5em", right: "2%", zIndex: "1000"}}>Powrót</button>
            </Link>
            {SessionManager.getRole() === "Vet" && <button className="header__buttons__end__btn" onClick={handleUpdate} style={{position: "absolute", right: "15rem", top: "3.5em"}}>
                <p>Edytuj profil</p>
            </button>}
            {!isLoading && 
            <div className="vetProfile">
                <div className="vetProfile__basicInfo">
                    {isLoadingImage && <div className="vetProfile__basicInfo_profilePicture" style={{position: "relative", zIndex: "1000"}}><Loader /></div>}
                    {!isLoadingImage && <img className="vetProfile__basicInfo_profilePicture" src={info.profilePicture} alt="VetProfilePicture"></img>}<br></br><br></br>
                    <label htmlFor="img" className="updateProfile__avatar__btn">Zmień zdjęcie profilowe</label><br></br>
                    <input name="Avatar" id = 'img' type="file" style={{visibility:"hidden"}} onChange={(e)=> handleImageChange(e)}/>
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

export default VetProfile;