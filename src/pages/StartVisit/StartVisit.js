import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'dayjs/locale/pl';

import "./StartVisit.css";
import PreviewVisit from "../../components/PreviewVisit";
import AddRabiesVaccination from "../../components/AddRabiesVaccination";
import AddOtherVaccinations from "../../components/AddOtherVaccinations";
import AddTreatments from "../../components/AddTreatments/AddTreatments";
import AddDiseases from "../../components/AddDiseases/AddDiseases";
import AddResearches from "../../components/AddResearches/AddResearches";
import AddWeight from "../../components/AddWeight/AddWeight";




function StartVisit(){
    const {visitType} = useParams();
    const [showPreview, setShowPreview] = useState(false);

    const [rabiesVaccinations, setrabiesVaccinations] = useState([]);
    const [infectiousDiseaseVaccinations, setInfectiousDiseaseVaccinations] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [researches, setResearches] = useState([]);
    const [weight, setWeight] = useState([]);

    const rabiesVacinationRef = React.useRef(null);
    const otherVacinationsRef = React.useRef(null);
    const treatmentsRef = React.useRef(null);
    const diseasesRef = React.useRef(null);
    const researchesRef = React.useRef(null);

    const handleShowPreview = () => {
        switch(visitType){
            case "1":
                checkRabiesVaccination()
                break
            case "2":
                checkOtherVaccinations()
                break;
            case "3":
                checkTreatments()
                break;
            case "4":
                checkDiseases()
                break;
            case "5":
                checkResearches()
                break;
            default:
                return ""
        }
    }

    const checkRabiesVaccination = () => {
        if (rabiesVacinationRef.current) {
            rabiesVacinationRef.current.validateData()
                .then(result => {
                    console.log('Wynik walidacji:', result);
                    setShowPreview(!showPreview)
                })
                .catch(error => {
                    console.error('Błąd walidacji:', error);
                });
          }
    }
    
    const checkOtherVaccinations = () => {
        if (otherVacinationsRef.current) {
            otherVacinationsRef.current.validateData()
                .then(result => {
                    console.log('Wynik walidacji:', result);
                    setShowPreview(!showPreview)
                })
                .catch(error => {
                    console.error('Błąd walidacji:', error);
                });
          }
    }

    const checkTreatments = () => {
        if (treatmentsRef.current) {
            treatmentsRef.current.validateData()
                .then(result => {
                    console.log('Wynik walidacji:', result);
                    setShowPreview(!showPreview)
                })
                .catch(error => {
                    console.error('Błąd walidacji:', error);
                });
          }
    }

    const checkDiseases = () => {
        if (diseasesRef.current) {
            diseasesRef.current.validateData()
                .then(result => {
                    console.log('Wynik walidacji:', result);
                    setShowPreview(!showPreview)
                })
                .catch(error => {
                    console.error('Błąd walidacji:', error);
                });
          }
    }

    const checkResearches = () => {
        if (researchesRef.current) {
            researchesRef.current.validateData()
                .then(result => {
                    console.log('Wynik walidacji:', result);
                    setShowPreview(!showPreview)
                })
                .catch(error => {
                    console.error('Błąd walidacji:', error);
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


    const returnFormToChosenVisitType = () => {
        switch(visitType){
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
            {showPreview === true ? <PreviewVisit handleShowPreview={handleChangePreview} 
            rabiesVaccinations={rabiesVaccinations} infectiousDiseaseVaccinations={infectiousDiseaseVaccinations} treatments={treatments}
            diseases={diseases} researches={researches} weights={weight}/> : <div>
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