import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Button } from "reactstrap";

import { getData, postData } from "../../components/Services/AccessAPI";

function ConfirmEmail(){
    const [activeEmail, setActiveEmail] = useState(false);
    const location = useLocation(); //removed brackets
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('activationToken');
    const email = urlParams.get('email');

    useEffect(() => {
        let query = 'api/User/ConfirmEmail?email=' + email + "&activationToken=" + token;
        getData(query).then((result) => {
            if(result === "True"){
                setActiveEmail(true);
            }
        });
    })

    const returnInfo = () => {
        if(activeEmail === true){
            return(
                <div className="header">
                    <p className="header__text">Twój email został potwierdzony i konto jest już aktywne. Kliknij Zaloguj, aby przejść do panelu logowania.</p>
                    <div className="header__buttons">
                        <Link to="/login">
                            <button className="header__buttons__btn">
                                <p>Zaloguj</p>
                            </button>
                        </Link>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div>
                    Potwierdzanie emaila...<br></br>Proszę czekać
                </div>
            );
        }
    }
    return(
        returnInfo()
    );
}

export default ConfirmEmail;