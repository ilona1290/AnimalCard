import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { getData } from "../../components/Services/AccessAPI";
import AnimalCardForm from "../../components/AnimalCardForm";
import Loader from "../../components/Loader";
import 'dayjs/locale/pl';
import dayjs from 'dayjs';

function UpdateAnimalCard(){
    const {petId} = useParams();
    const [pet, setPet] = useState(null);
    const [isLoading, setLoading] = useState(true);
    console.log(pet)
    useEffect(() => {
        getData(`api/Pet/${petId}`).then((result) => {
            result.dateBirth = dayjs(new Date(result.dateBirth));
            setPet(result);
            setLoading(false);
        })
    }, [])
    return(
        <div style={{width:"100%"}}>
            {isLoading && <Loader />}
            {!isLoading && <AnimalCardForm type="update" petData={pet}/>}
        </div>
    )
}

export default UpdateAnimalCard;