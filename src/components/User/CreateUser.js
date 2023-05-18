import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postData } from "../Services/AccessAPI";

import './CreateUser.css';
import userIcon from'./userIcon.svg';
import vetIcon from'./vetIcon.svg';


function CreateUser() {
    const [roles, setRoles] = useState([]);
    const [isNotVet, setIsNotVet] = useState(false);
    let navigate = useNavigate();

    const chooseRole = () => {
        if(roles.length === 0){
            return(
                <div className="wm-hero">
                    <h1>Wybierz swoją rolę</h1>
                    <div className="container_roles">
                        <div className="container_roles__role" onClick={() => saveRole('USER')}>
                            <img className="container_roles__role__img" src={userIcon} alt="Owner"></img>
                            <p className="container_roles__role__text">Właściciel</p>
                        </div>
                        <div className="container_roles__role" onClick={() => saveRole('VET')}>
                            <img className="container_roles__role__img" src={vetIcon} alt="Vet"></img>
                            <p className="container_roles__role__text">Weterynarz</p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    const saveRole = (role) => {
        setRoles([...roles, role]);
    }

    const returnFormRegistry = () => {
        if(roles.length !== 0){
            if(roles[0] === "USER"){
                return(
                    <div className="container">
                        <div className="wrapper">
                            <div className="title">Rejestracja</div>
                            <form onSubmit={onSubmitUser}>
                                <div className="field">
                                    <input type="text" name="name" required></input>
                                    <label>Imię</label>
                                </div>
                                <div className="field">
                                    <input type="text" name="surname" required></input>
                                    <label>Nazwisko</label>
                                </div>
                                {/* <div className="field">
                                    <select name="sex" id="sex">
                                        <option disabled selected value></option>
                                        <option value="Kobieta">Kobieta</option>
                                        <option value="Meżczyzna">Meżczyzna</option>
                                    </select>
                                    <label>Płeć: </label>
                                </div> */}
                                <div className="field">
                                    <input type="text" name="email" required/>
                                    <label>Email</label>
                                </div>
                                <div className="field">
                                    <input type="text" name="phoneNumber" required></input>
                                    <label>Nr-telefonu: </label>
                                </div>
                                <div className="field">
                                    <input type="password" name="password" required></input>
                                    <label>Hasło: </label>
                                </div>
                                <div className="field">
                                    <input type="password" name="confirmationPassword" required></input>
                                    <label>Potwierdź hasło: </label>
                                </div>
                                <div className="field">
                                    <button onClick={onSubmitUser} className="action__login__btn">Zarejestruj</button>
                                </div>
                                <div className="field">
                                    <Link to="/"><input type="reset" value="Powrót"/></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            }
            else if(roles[0] === "VET"){
                return(
                    <div className="container">
                        <div className="wrapper">
                            <div className="title">Rejestracja</div>
                            <form onSubmit={onSubmitVet}>
                                <div className="field">
                                    <input type="text" name="nrPWZ" required></input>
                                    <label>NrPWZ</label>
                                </div>
                                <div className="field">
                                    <input type="text" name="name" required></input>
                                    <label>Imię</label>
                                </div>
                                <div className="field">
                                    <input type="text" name="surname" required></input>
                                    <label>Nazwisko</label>
                                </div>
                                {/* <div className="field">
                                    <select name="sex" id="sex">
                                        <option disabled selected value></option>
                                        <option value="Kobieta">Kobieta</option>
                                        <option value="Meżczyzna">Meżczyzna</option>
                                    </select>
                                    <label>Płeć: </label>
                                </div> */}
                                <div className="field">
                                    <input type="text" name="email" required/>
                                    <label>Email</label>
                                </div>
                                <div className="field">
                                    <input type="text" name="phoneNumber" required></input>
                                    <label>Nr-telefonu: </label>
                                </div>
                                <div className="field">
                                    <input type="password" name="password" required></input>
                                    <label>Hasło: </label>
                                </div>
                                <div className="field">
                                    <input type="password" name="confirmationPassword" required></input>
                                    <label>Potwierdź hasło: </label>
                                </div>
                                <div className="field">
                                    <button onClick={onSubmitUser} className="action__login__btn">Zarejestruj</button>
                                </div>
                                <div className="field">
                                    <Link to="/"><input type="reset" value="Powrót"/></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            }
        }
    }

    const onSubmitUser = (event) => {
        event.preventDefault();
        const { name, surname, sex, email, phoneNumber, password, confirmationPassword} = event.target.elements;

        if (password.value !== confirmationPassword.value) {
            alert("Password and confirm password are not same");
            return;
        }

        let userObj = {
            name: name.value,
            surname: surname.value,
            sex: sex.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            password: password.value,
            confirmationPassword: confirmationPassword.value,
            roles: roles
        }

        postData('api/User/CreateUser', userObj).then((result) => {
            if(result === true){
                navigate("/confirmEmailInfo");
            }
        });
    }

    const onSubmitVet = (event) => {
        event.preventDefault();
        const { nrPWZ, name, surname, sex, email, phoneNumber, password, confirmationPassword} = event.target.elements;

        if (password.value !== confirmationPassword.value) {
            alert("Password and confirm password are not same");
            return;
        }

        let userObj = {
            nrPWZ: nrPWZ.value,
            name: name.value,
            surname: surname.value,
            sex: sex.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            password: password.value,
            confirmationPassword: confirmationPassword.value,
            roles: roles
        }

        postData('api/Vet/CreateVet', userObj).then((result) => {
            if(result === true){
                navigate("/confirmEmailInfo");
            }
            else{
                setIsNotVet(true);
            }
        });
    }

    const returnIsNotVet = () => {
        return(
            // <div className="container">
            <div style={{textAlign: "center", paddingTop:"1em", color: "black", fontSize: "2em"}}>
                W bazie nie istnieje lekarz o podanych kryteriach wyszukiwania. Sprawdź poprawność danych.

            {/* </div> */}
        </div>
        );
    }

    return (
        <div>
        { isNotVet && returnIsNotVet() }
        { chooseRole() }
        { returnFormRegistry() }
        </div>
    );
}

export default CreateUser;