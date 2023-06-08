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
            id: 0,
            nameOfPlace: null,
            city: '',
            district: null,
            street: '',
            houseNumber: '',
            premisesNumber: null
        }
    ])
    useEffect(() => {
        getData('api/Vet/' + SessionManager.getUserId() + "/ToEdit").then((result) => {
            console.log(result)
            setAboutMe(result.aboutMe);
            setAddressFields(result.addresses)
            setChosenDiseases(result.diseases.map(a => a.name))
            setCustomDiseases(result.customDiseases.map(a => a.name))
            setChosenServicesTreatments(result.servicesTreatments.map(a => a.name))
            setCustomServicesTreatments(result.customServicesTreatments.map(a => a.name))
            setprofilePictureUrl(result.profilePicture)
            setLoading(false);
        })
        getData('api/Vet/GetDiseasesAndServicesTreatments').then((result) => {
            setDiseases(result.diseases);
            setservicesTreatments(result.servicesTreatments);
        })
        setLoading(false);
      }, [isLoading]);

    const handleClick = () => {

        let treatedDiseasesAll = chosenDiseases.concat(customDiseases.filter((str) => str !== ''));

        let providedServicesTreatmentsAll = chosenServicesTreatments.concat(customServicesTreatments.filter((str) => str !== ''));

        console.log(addressFields)
        const dataToSend = {
            idVet: SessionManager.getUserId(),
            profilePicture: profilePictureUrl,
            aboutMe: aboutMe,
            addresses: addressFields,
            treatedDiseases: treatedDiseasesAll,
            providedServicesTreatments: providedServicesTreatmentsAll
        }
        console.log(addressFields)
        postData('api/Vet/UpdateVetProfile', dataToSend).then((result) => {
            if(result === ""){
                navigate("/vetMenu/profile");
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
            id: 0,
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

    const handleRemove = (index) => {
        let data = [...addressFields];
        data.splice(index, 1)
        setAddressFields(data);
    }

    const handleRemoveDiseases = (index) => {
        console.log(index)
        let data = [...customDiseases];
        data.splice(index, 1)
        setCustomDiseases(data);
    }
    const handleRemoveServices = (index) => {
        let data = [...customServicesTreatments];
        data.splice(index, 1)
        setCustomServicesTreatments(data);
    }

    return(
        <div>
            <div className="header__buttons__end">
                <Link to="/vetMenu">
                    <button className="header__buttons__end__btn" style={{position: "absolute", right: "6%", top: "3.5em"}}>
                        <p>Zrobię to później</p>
                    </button>
                </Link>
            </div>
            {isLoading && <Loader />}
            {!isLoading &&
            <div className="updateProfile">
                <div className="updateProfile__avatar">
                    <img className="updateProfile__avatar__img" src={profilePictureUrl} alt="ProfilePicture"></img>
                    <label htmlFor="img" className="updateProfile__avatar__btn">Zmień zdjęcie profilowe</label>
                    <input name="Avatar" id = 'img' type="file" style={{visibility:"hidden"}} onChange={(e)=> handleImageChange(e)}/>
                </div>
                
                <ThemeProvider theme={theme}>
                <Typography component={'span'} variant={'body2'}>
                    <TextField
                        id="outlined-multiline-static"
                        label="O mnie"
                        value={aboutMe}
                        multiline
                        rows={4}
                        style={{width: "90%"}} onChange={handleChangeAboutMe}
                    /><br /><br/>
                    {!isLoading && <DiseasesAndServicesTreatments label="Choroby" chosen={chosenDiseases} optionsToShow={diseases} handleChange={handleChangeDiseases}/>}<br></br>
                    {!isLoading && <DiseasesAndServicesTreatments label="Usługi i zabiegi" chosen={chosenServicesTreatments}  optionsToShow={servicesTreatments} handleChange={handleChangeServicesTreatments}/>}
                    <h2>Choroby</h2>
                    <CustomDiseasesAndServicesTreatments name='name' placeholder="Nazwa choroby" addFields={addFieldsDisease} customArray={customDiseases} handleChange={handleFormChangeDiseases} handleRemove={handleRemoveDiseases}/>
                    <h2>Usługi i zabiegi</h2>
                    <CustomDiseasesAndServicesTreatments name='name' placeholder="Nazwa usługi, bądź zabiegu" addFields={addFieldsServiceTreatment} customArray={customServicesTreatments} handleChange={handleFormChangeServicesTreatments} handleRemove={handleRemoveServices}/>
                    <h2>Adresy</h2>
                    <AddressesForm addFields={addFieldsAddress} addressesArray={addressFields} handleChange={handleFormChangeAddresses} handleRemove={handleRemove}/>
                </Typography>
                </ThemeProvider>
                <button className="updateProfile__send" onClick={handleClick}>Zapisz</button>
            </div>}
        </div>
    );
}

export default UpdateVetProfile;