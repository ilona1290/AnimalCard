import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getData, postData } from "../../components/Services/AccessAPI";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DiseasesAndServicesTreatments from "../../components/DiseasesAndServicesTreatments";
import CustomDiseasesAndServicesTreatments from "../../components/CustomDiseasesAndServicesTreatments";
import SessionManager from "../../components/Auth/SessionManager";
import AddressesForm from "../../components/AddressesForm";

import './UpdateVetProfile.css';
import Loader from "../../components/Loader";

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

function UpdateVetProfile(){
    let navigate = useNavigate();
    const [diseases, setDiseases] = useState([]);
    const [servicesTreatments, setservicesTreatments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [aboutMe, setAboutMe] = useState("");
    const [chosenDiseases, setChosenDiseases] = useState([]);
    const [chosenServicesTreatments, setChosenServicesTreatments] = useState([]);
    const [customDiseases, setCustomDiseases] = useState([''])
    const [customServicesTreatments, setCustomServicesTreatments] = useState([''])
    const [profilePictureUrl, setprofilePictureUrl] = useState("https://animalcard.blob.core.windows.net/profilepictures/vetDefaultProfilePicture.png");
    const [addressFields, setAddressFields] = useState([
        {
            nameOfPlace: null,
            city: '',
            district: null,
            street: '',
            houseNumber: '',
            premisesNumber: null
        }
    ])
    useEffect(() => {
        getData('api/Vet/GetDiseasesAndServicesTreatments').then((result) => {
            setDiseases(result.diseases);
            setservicesTreatments(result.servicesTreatments);
            setLoading(false);
        })
      }, [isLoading]);

    const handleClick = () => {

        let treatedDiseasesAll = chosenDiseases.concat(customDiseases.filter((str) => str !== ''));

        let providedServicesTreatmentsAll = chosenServicesTreatments.concat(customServicesTreatments.filter((str) => str !== ''));

        const dataToSend = {
            idVet: SessionManager.getUserId(),
            profilePicture: profilePictureUrl,
            aboutMe: aboutMe,
            addresses: addressFields,
            treatedDiseases: treatedDiseasesAll,
            providedServicesTreatments: providedServicesTreatmentsAll
        }

        postData('api/Vet/UpdateVetProfile', dataToSend).then((result) => {
            if(result === ""){
                navigate("/vetMenu");
            }
        });
    }

    const handleChangeDiseases = value => {
        setChosenDiseases(value);
    }

    const handleChangeServicesTreatments = (value) => {
        setChosenServicesTreatments(value);
    }

    const handleFormChangeDiseases = (index, event) => {
        let data = [...customDiseases];
        data[index] = event.target.value;
        setCustomDiseases(data);
    }

    const handleFormChangeServicesTreatments = (index, event) => {
        let data = [...customServicesTreatments];
        data[index] = event.target.value;
        setCustomServicesTreatments(data);
    }

    const handleFormChangeAddresses = (index, event) => {
        let data = [...addressFields];
        data[index][event.target.name] = event.target.value;
        setAddressFields(data);
    }

    const addFieldsDisease = () => {
        let newfield = ''
        setCustomDiseases([...customDiseases, newfield])
    }

    const addFieldsServiceTreatment = () => {
        let newfield = ''
        setCustomServicesTreatments([...customServicesTreatments, newfield])
    }

    const addFieldsAddress = () => {
        let newfield = {
            nameOfPlace: null,
            city: '',
            district: null,
            street: '',
            houseNumber: '',
            premisesNumber: null
        }
    
        setAddressFields([...addressFields, newfield])
    }

    const addImage = (form) => {
        fetch('https://localhost:7099/api/upload/profilePicture',
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
            setprofilePictureUrl(result);
            SessionManager.updateProfilePicture(result);
        })
    }
    
    const handleImageChange = (e) => {
        e.preventDefault();
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('image', element);
        }
        form.append('fileName', "Img");
        addImage(form);
    };

    const handleChangeAboutMe = (event) => {
        setAboutMe(event.target.value);
    }

    return(
        <div>
            <div className="header__buttons__end">
                <Link to="/vetMenu">
                    <button className="header__buttons__end__btn" style={{position: "absolute", right: "6em", top: "3.5em"}}>
                        <p>Zrobię to później</p>
                    </button>
                </Link>
            </div>
            {isLoading && <Loader />}
            {!isLoading &&
            <div className="updateProfile">
                <div className="updateProfile__avatar">
                    <img className="updateProfile__avatar__img" src={SessionManager.getProfilePicture()} alt="ProfilePicture"></img>
                    <label htmlFor="img" className="updateProfile__avatar__btn">Zmień zdjęcie profilowe</label>
                    <input name="Avatar" id = 'img' type="file" style={{visibility:"hidden"}} onChange={(e)=> handleImageChange(e)}/>
                </div>
                
                <ThemeProvider theme={theme}>
                <Typography component={'span'} variant={'body2'}>
                    <TextField
                        id="outlined-multiline-static"
                        label="O mnie"
                        multiline
                        rows={4}
                        style={{width: "90%"}} onChange={handleChangeAboutMe}
                    /><br /><br/>
                    {!isLoading && <DiseasesAndServicesTreatments label="Choroby" optionsToShow={diseases} handleChange={handleChangeDiseases} />}<br></br>
                    {!isLoading && <DiseasesAndServicesTreatments label="Usługi i zabiegi" optionsToShow={servicesTreatments} handleChange={handleChangeServicesTreatments} />}
                    <CustomDiseasesAndServicesTreatments name='name' placeholder="Nazwa choroby" addFields={addFieldsDisease} customArray={customDiseases} handleChange={handleFormChangeDiseases}/>
                    <CustomDiseasesAndServicesTreatments name='name' placeholder="Nazwa usługi, bądź zabiegu" addFields={addFieldsServiceTreatment} customArray={customServicesTreatments} handleChange={handleFormChangeServicesTreatments}/>
                    <AddressesForm addFields={addFieldsAddress} addressesArray={addressFields} handleChange={handleFormChangeAddresses}/>
                </Typography>
                </ThemeProvider>
                <button className="updateProfile__send" onClick={handleClick}>Wyślij</button>
            </div>}
        </div>
    );
}

export default UpdateVetProfile;