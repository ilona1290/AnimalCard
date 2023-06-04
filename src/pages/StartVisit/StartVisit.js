import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'dayjs/locale/pl';
import { getData } from "../../components/Services/AccessAPI";
import SessionManager from "../../components/Auth/SessionManager";
import Loader from "../../components/Loader";

import "./StartVisit.css";
import PreviewVisit from "../../components/PreviewVisit";
import AddRabiesVaccination from "../../components/AddRabiesVaccination";
import AddOtherVaccinations from "../../components/AddOtherVaccinations";
import AddTreatments from "../../components/AddTreatments/AddTreatments";
import AddDiseases from "../../components/AddDiseases/AddDiseases";
import AddResearches from "../../components/AddResearches/AddResearches";
import AddWeight from "../../components/AddWeight/AddWeight";
import ChooseOwnerAndPet from "../../components/ChooseOwnerAndPet/ChooseOwnerAndPet";




function StartVisit(){
    const {visitId, visitType} = useParams();
    const [showPreview, setShowPreview] = useState(false);
    const [ownersWithPets, setOwnersWithPets] = useState([]);
    const [isLoading, setLoading] = React.useState(true);

    const [ownerAndPatient, setOwnerAndPatient] = React.useState({
        owner: "",
        patient: "",
        patientId: 0
    });
    const [rabiesVaccinations, setrabiesVaccinations] = useState([]);
    const [infectiousDiseaseVaccinations, setInfectiousDiseaseVaccinations] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [researches, setResearches] = useState([]);
    const [weight, setWeight] = useState([]);

    const [results, setResults] = useState([]);

    const rabiesVacinationRef = React.useRef(null);
    const otherVacinationsRef = React.useRef(null);
    const treatmentsRef = React.useRef(null);
    const diseasesRef = React.useRef(null);
    const researchesRef = React.useRef(null);
    const ownerPatientRef = React.useRef(null);
    console.log(ownerAndPatient)
    React.useEffect(() => {
        getData(`api/Visit/GetDataToNewVisit/${SessionManager.getUserId()}`).then((result) => {
            setOwnersWithPets(result.owners)
            console.log(result.owners)
            setLoading(false)
        })
    }, [])
    const handleShowPreview = async () => {
        
        const resultOfValidation = await checkValidity();
        console.log(resultOfValidation);
        if (resultOfValidation === true) {
            setShowPreview(!showPreview);
        }
        // switch(visitType){
        //     case "0":
        //         checkOwnerPatient()
        //         break
        //     case "1":
        //         checkRabiesVaccination()
        //         break
        //     case "2":
        //         checkOtherVaccinations()
        //         break;
        //     case "3":
        //         checkTreatments()
        //         break;
        //     case "4":
        //         checkDiseases()
        //         break;
        //     case "5":
        //         checkResearches()
        //         break;
        //     default:
        //         return ""
        // }
    }

    const checkValidity = async () => {
        const arrays = [rabiesVaccinations, infectiousDiseaseVaccinations,
            diseases, treatments, researches];
        const promises = [];
      
        if (visitId === "0") {
          promises.push(checkOwnerPatient());
        }
      
        if (rabiesVaccinations.length !== 0) {
          promises.push(checkRabiesVaccination());
        }
      
        if (infectiousDiseaseVaccinations.length !== 0) {
          promises.push(checkOtherVaccinations());
        }
      
        if (diseases.length !== 0) {
          promises.push(checkDiseases());
        }
      
        if (treatments.length !== 0) {
          promises.push(checkTreatments());
        }
      
        if (researches.length !== 0) {
          promises.push(checkResearches());
        }
      
        const results = await Promise.all(promises);
        console.log(results);
      
        const isValid = results.every((result) => result === true);
        const hasEmptyArrays = arrays.every((arr) => arr.length === 0);
      
        let element = document.getElementsByClassName("information")[0]
        if(visitId === "0" && hasEmptyArrays){
            element.textContent = "Musisz uzupełnić przynajmniej jeden element wizyty."
            return false;
        }
        else{
            element.textContent = "";
        }
        if (isValid) {
          return true;
        } else {
          return false;
        }
      };

    const checkRabiesVaccination = () => {
        if (rabiesVacinationRef.current) {
          return new Promise((resolve, reject) => {
            rabiesVacinationRef.current.validateData()
              .then(result => {
                console.log('Wynik walidacji:', result);
                resolve(true);
              })
              .catch(error => {
                console.error('Błąd walidacji:', error);
                reject(false);
              });
          });
        }
      };
    
    const checkOtherVaccinations = () => {
        if (otherVacinationsRef.current) {
            return new Promise((resolve, reject) => {
            otherVacinationsRef.current.validateData()
                .then(result => {
                    console.log('Wynik walidacji:', result);
                    resolve(true);
                })
                .catch(error => {
                    console.error('Błąd walidacji:', error);
                    reject(false);
                });
            });
          }
    }

    const checkTreatments = () => {
        if (treatmentsRef.current) {
            return new Promise((resolve, reject) => {
            treatmentsRef.current.validateData()
                .then(result => {
                    console.log('Wynik walidacji:', result);
                    resolve(true);
                })
                .catch(error => {
                    console.error('Błąd walidacji:', error);
                    reject(false);
                });
            });
          }
    }

    const checkDiseases = () => {
        if (diseasesRef.current) {
            return new Promise((resolve, reject) => {
            diseasesRef.current.validateData()
                .then(result => {
                    console.log('Wynik walidacji:', result);
                    resolve(true);
                })
                .catch(error => {
                    console.error('Błąd walidacji:', error);
                    reject(false);
                });
            });
          }
    }

    const checkResearches = () => {
        if (researchesRef.current) {
            return new Promise((resolve, reject) => {
            researchesRef.current.validateData()
                .then(result => {
                    console.log('Wynik walidacji:', result);
                    resolve(true);
                })
                .catch(error => {
                    console.error('Błąd walidacji:', error);
                    reject(false);
                });
            });
          }
    }

    const checkOwnerPatient = () => {
        if (ownerPatientRef.current) {
            return new Promise((resolve, reject) => {
            ownerPatientRef.current.validateData()
                .then(result => {
                    console.log('Wynik walidacji:', result);
                    resolve(true);
                })
                .catch(error => {
                    console.error('Błąd walidacji:', error);
                    reject(false);
                });
            });
          }
    }


    const handleChangePreview = () => {
        setShowPreview(!showPreview)
    }


    const handleRabiesVaccinationsChanged = (rabiesVaccinationChanged) => {
        setrabiesVaccinations(rabiesVaccinationChanged)
    }

    const handleOtherVaccinationsChanged = (otherVaccinationsChanged) => {
        setInfectiousDiseaseVaccinations(otherVaccinationsChanged)
    }

    const handleTreatmentsChanged = (treatmentsChanged) => {
        setTreatments(treatmentsChanged)
    }

    const handleDiseasesChanged = (diseasesChanged) => {
        setDiseases(diseasesChanged)
    }

    const handleResearchesChanged = (researchesChanged) => {
        setResearches(researchesChanged)
    }
    
    const handleWeightChanged = (weightChanged) =>{
        setWeight(weightChanged)
    }

    const handleOwnerPetChanged = (ownerPetChanged) =>{
        setOwnerAndPatient(ownerPetChanged)
    }


    const returnFormToChosenVisitType = () => {
        switch(visitType){
            case "0":
                return(
                    <>
                        {isLoading && <Loader />}
                        {!isLoading && <div>
                            <ChooseOwnerAndPet ref={ownerPatientRef} ownerWithPet={ownerAndPatient} ownersWithPets={ownersWithPets} onOwnerAndPetChanged={handleOwnerPetChanged}/>
                            <h5 className="information"></h5>
                            <AddRabiesVaccination ref={rabiesVacinationRef} rabiesVaccinations={rabiesVaccinations} onRabiesVaccinationsChanged={handleRabiesVaccinationsChanged}/>
                            <AddOtherVaccinations ref={otherVacinationsRef} otherVaccinations={infectiousDiseaseVaccinations} onOtherVaccinationsChanged={handleOtherVaccinationsChanged}/>
                            <AddTreatments ref={treatmentsRef} treatments={treatments} onTreatmentsChanged={handleTreatmentsChanged}/>
                            <AddDiseases ref={diseasesRef} diseases={diseases} onDiseasesChanged={handleDiseasesChanged}/>
                            <AddResearches ref={researchesRef} researches={researches} onResearchesChanged={handleResearchesChanged}/>
                            <AddWeight weight={weight} onWeightChanged={handleWeightChanged}/></div>}
                    </>
                )
            case "1":
                return(
                <>
                    <AddRabiesVaccination ref={rabiesVacinationRef} rabiesVaccinations={rabiesVaccinations} onRabiesVaccinationsChanged={handleRabiesVaccinationsChanged}/>
                    <AddWeight weight={weight} onWeightChanged={handleWeightChanged}/>
                </>)
            case "2":
                return(
                    <>
                        <AddOtherVaccinations ref={otherVacinationsRef} otherVaccinations={infectiousDiseaseVaccinations} onOtherVaccinationsChanged={handleOtherVaccinationsChanged}/>
                        <AddWeight weight={weight} onWeightChanged={handleWeightChanged}/>
                    </>
                )
            case "3":
                return (
                <>
                    <AddTreatments ref={treatmentsRef} treatments={treatments} onTreatmentsChanged={handleTreatmentsChanged}/>
                    <AddWeight weight={weight} onWeightChanged={handleWeightChanged}/>
                </>)
            case "4":
                return(
                    <>
                        <AddDiseases ref={diseasesRef} diseases={diseases} onDiseasesChanged={handleDiseasesChanged}/>
                        <AddWeight weight={weight} onWeightChanged={handleWeightChanged}/>
                    </>
                )
            case "5":
                return(
                    <>
                        <AddResearches ref={researchesRef} researches={researches} onResearchesChanged={handleResearchesChanged}/>
                        <AddWeight weight={weight} onWeightChanged={handleWeightChanged}/>
                    </>
                )
            default:
                return ""
        }
    }

    return(
        <div style={{paddingTop: "9em"}}>
            {showPreview === true ? <PreviewVisit visitId={visitId} handleShowPreview={handleChangePreview} 
            rabiesVaccinations={rabiesVaccinations} infectiousDiseaseVaccinations={infectiousDiseaseVaccinations} treatments={treatments}
            diseases={diseases} researches={researches} weights={weight} ownerAndPatient={ownerAndPatient}/> : <div>
                <Link to="/vetMenu/calendar">
                    <button className="header__buttons__end__btn" style={{position: "absolute", right: "2rem", top: "3.5em"}}>
                        <p>Powrót</p>
                    </button>
                </Link>
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "15rem", top: "3.5em"}} onClick={handleShowPreview}>
                    <p>Zakończ wizytę</p>
                </button>
                {/* Tak wywołuje się funkcje w jsx */}
                {returnFormToChosenVisitType()}
            </div>}
        </div>
    )
}

export default StartVisit;